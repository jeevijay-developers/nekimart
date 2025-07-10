import React, { useRef, useState } from "react";
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { toast } from "react-toastify";
import requests from "@services/httpServices";
import { getUserSession } from "@lib/auth";
import axios from "axios";
import PartnerWithUs from "@services/partnerWithUsServices";

const PartnerRegistrationForm = () => {
  const userInfo = getUserSession(); 

  const initial = {
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    mobile: userInfo?.phone || "",
    brandName: "",
    logo: null,
    logoUrl: "",
    aboutProduct: "",
    aadharCard: null,
    aadharCardUrl: "",
    panCard: null,
    panCardUrl: "",
    bankAccNumber: "",
    IFSC: "",
    accountHolderName: "",
    bankBranch: "",
    GSTNumber: "",
    cancelCheque: null,
    cancelChequeUrl: "",
    address: "",
    pincode: "",
    aadharNumber: "",
    panNumber: "",
  };

  const fileInputRefs = useRef({});
  const formRef = useRef(null);
  const { storeCustomizationSetting, loading } = useGetSetting();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [formData, setFormData] = useState(initial);

  const formFields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      readOnly: true,
    },
    {
      name: "mobile",
      label: "Your Mobile Number",
      type: "number",
      placeholder: "Enter your mobile number",
      required: true,
      readOnly: true,
    },
    {
      name: "email",
      label: "Mail ID",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      readOnly: true,
    },
    {
      name: "brandName",
      label: "Your Brand Name",
      type: "text",
      placeholder: "Enter your brand name",
      required: true,
    },
    {
      name: "logo",
      label: "Logo (If Applicable)",
      type: "file",
      required: false,
    },
    {
      name: "aboutProduct",
      label: "Brief About Your Products",
      type: "textarea",
      placeholder: "Describe your products",
      required: false,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Your Address",
      required: false,
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "number",
      placeholder: "Enter Your Pincode",
      required: true,
    },
    {
      name: "aadharCard",
      label: "Upload Your Aadhar Card",
      type: "file",
      required: true,
    },
    {
      name: "aadharNumber",
      label: "Your Aadhar Number",
      type: "number",
      required: true,
    },
    {
      name: "panCard",
      label: "Upload Your PAN Card",
      type: "file",
      required: true,
    },
    {
      name: "panNumber",
      label: "Your PAN Number",
      type: "text",
      required: true,
    },
    {
      name: "bankAccNumber",
      label: "Account Number",
      type: "number",
      placeholder: "Enter account number",
      required: true,
    },
    {
      name: "IFSC",
      label: "IFSC Code",
      type: "text",
      placeholder: "Enter IFSC code",
      required: true,
    },
    {
      name: "accountHolderName",
      label: "Account Holder Name",
      type: "text",
      placeholder: "Enter account holder name",
      required: true,
    },
    {
      name: "GSTNumber",
      label: "GST Registration Number",
      type: "text",
      placeholder: "Enter GST number",
      required: true,
    },
    {
      name: "cancelCheque",
      label: "Upload Cancel Cheque",
      type: "file",
      required: true,
    },
    {
      name: "bankBranch",
      label: "Your Bank Branch",
      type: "text",
      placeholder: "Enter bank branch",
      required: true,
    },
  ];

  const uploadToCloudinary = async (file, fieldName) => {
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_URL ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    ) {
      console.error("Missing Cloudinary environment variables.");
      return null;
    }

    setUploadingFiles((prev) => ({ ...prev, [fieldName]: true }));

    try {
      const form = new FormData();
      form.append("file", file);
      form.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error(`Failed to upload ${fieldName}. Please try again.`);
      return null;
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleChange = async (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file" && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      const uploadedUrl = await uploadToCloudinary(files[0], name);
      if (uploadedUrl) {
        setFormData((prev) => ({
          ...prev,
          [`${name}Url`]: uploadedUrl,
        }));
        toast.success(`${name} uploaded successfully!`);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFiles = ["aadharCard", "panCard", "cancelCheque"];
    const missingUploads = requiredFiles.filter(
      (field) => formData[field] && !formData[`${field}Url`]
    );

    if (missingUploads.length > 0) {
      toast.error("Please wait for all files to upload before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      await PartnerWithUs.register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        brandName: formData.brandName,
        aboutProduct: formData.aboutProduct,
        bankAccNumber: formData.bankAccNumber,
        IFSC: formData.IFSC,
        accountHolderName: formData.accountHolderName,
        bankBranch: formData.bankBranch,
        logoUrl: formData.logoUrl,
        aadharCardUrl: formData.aadharCardUrl,
        panCardUrl: formData.panCardUrl,
        cancelChequeUrl: formData.cancelChequeUrl,
        GSTNumber: formData.GSTNumber,
        aadharNumber: formData.aadharNumber,
        address: formData.address,
        pincode: formData.pincode,
        panNumber: formData.panNumber,
      });

      toast.success("Thanks for submitting. Our team will contact you soon.");
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error?.response?.data?.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initial);
    Object.keys(fileInputRefs.current).forEach((key) => {
      if (fileInputRefs.current[key]) {
        fileInputRefs.current[key].value = "";
      }
    });
  };

  return (
    <Layout title="Partner Registration" description="Register as a Partner">
      {loading ? (
        <CMSkeleton />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8 mt-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-customColor px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Partner Registration Form
              </h2>
              <p className="text-indigo-100 mt-1 text-sm">
                Fill in the details below to join our partner network
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required={field.required}
                      />
                    ) : field.type === "file" ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          id={field.name}
                          name={field.name}
                          ref={(el) => (fileInputRefs.current[field.name] = el)}
                          onChange={handleChange}
                          className="w-full"
                          accept="image/*"
                          required={field.required}
                        />
                        {uploadingFiles[field.name] && (
                          <div className="text-sm text-blue-600 flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                            Uploading...
                          </div>
                        )}
                        {formData[`${field.name}Url`] && (
                          <div className="text-sm text-green-600">
                            ✓ File uploaded successfully
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                          field.readOnly ? "cursor-not-allowed text-gray-500" : ""
                        } `}
                        required={field.required}
                        readOnly={field.readOnly}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-4"
                  disabled={isSubmitting}
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-customColor hover:bg-customColorDark rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customColor disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    isSubmitting || Object.values(uploadingFiles).some(Boolean)
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Register Partner"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PartnerRegistrationForm;
