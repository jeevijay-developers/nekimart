import React, { useState } from "react";
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { toast } from "react-toastify";
import requests from "@services/httpServices";
import { getUserSession } from "@lib/auth";
import axios from "axios";

const PartnerRegistrationForm = () => {
  const { storeCustomizationSetting, loading } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const userInfo = getUserSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({});

  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    mobile: userInfo?.phone || "",
    brandName: "",
    logo: null,
    logoUrl: "", // Store Cloudinary URL
    aboutProduct: "",
    aadharCard: null,
    aadharCardUrl: "", // Store Cloudinary URL
    panCard: null,
    panCardUrl: "", // Store Cloudinary URL
    bankAccNumber: "",
    IFSC: "",
    accountHolderName: "",
    bankBranch: "",
  });

  const formFields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "mobile",
      label: "Your Mobile Number",
      type: "tel",
      placeholder: "Enter your mobile number",
    },
    {
      name: "email",
      label: "Mail ID",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "brandName",
      label: "Your Brand Name",
      type: "text",
      placeholder: "Enter your brand name",
    },
    { name: "logo", label: "Logo (If Applicable)", type: "file" },
    {
      name: "aboutProduct",
      label: "Brief About Your Products",
      type: "textarea",
      placeholder: "Describe your products",
    },
    { name: "aadharCard", label: "Upload Your Aadhar Card", type: "file" },
    { name: "panCard", label: "Upload Your PAN Card", type: "file" },
    {
      name: "bankAccNumber",
      label: "Account Number",
      type: "text",
      placeholder: "Enter account number",
    },
    {
      name: "IFSC",
      label: "IFSC Code",
      type: "text",
      placeholder: "Enter IFSC code",
    },
    {
      name: "accountHolderName",
      label: "Account Holder Name",
      type: "text",
      placeholder: "Enter account holder name",
    },
    {
      name: "bankBranch",
      label: "Your Bank Branch",
      type: "text",
      placeholder: "Enter bank branch",
    },
  ];

  // Function to upload file to Cloudinary
  const uploadToCloudinary = async (file, fieldName) => {
    setUploadingFiles((prev) => ({ ...prev, [fieldName]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
      // Store the file for form display
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Upload to Cloudinary
      const uploadedUrl = await uploadToCloudinary(files[0], name);
      if (uploadedUrl) {
        setFormData((prev) => ({
          ...prev,
          [`${name}Url`]: uploadedUrl,
        }));
        toast.success(`${name} uploaded successfully!`);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if all required files are uploaded
    const requiredFiles = ["logo", "aadharCard", "panCard"];
    const missingUploads = requiredFiles.filter(
      (field) => formData[field] && !formData[`${field}Url`]
    );

    if (missingUploads.length > 0) {
      toast.error("Please wait for all files to upload before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to Web3Forms with image URLs instead of files
      const web3Response = await axios.post(
        "https://api.web3forms.com/submit",
        {
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "New Partner Registration",
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          brandName: formData.brandName,
          aboutProduct: formData.aboutProduct,
          accountNumber: formData.bankAccNumber,
          IFSC: formData.IFSC,
          accountHolderName: formData.accountHolderName,
          bankBranch: formData.bankBranch,
          // Send Cloudinary URLs instead of files
          logoUrl: formData.logoUrl || "Not provided",
          aadharCardUrl: formData.aadharCardUrl || "Not provided",
          panCardUrl: formData.panCardUrl || "Not provided",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const web3Result = web3Response.data;
      console.log("Web3Forms response:", web3Result);

      if (web3Result.success) {
        toast.success(
          "Thanks For Submitting Partner Registration. Our Team Will Get Back To You Soon."
        );

        // Reset form
        setFormData({
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
        });
      } else {
        throw new Error(web3Result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                        required
                      />
                    ) : field.type === "file" ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          id={field.name}
                          name={field.name}
                          onChange={handleChange}
                          className="w-full"
                          accept="image/*"
                          required
                        />
                        {uploadingFiles[field.name] && (
                          <div className="flex items-center text-sm text-blue-600">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
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
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
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
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : Object.values(uploadingFiles).some(Boolean) ? (
                    "Uploading Files..."
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
