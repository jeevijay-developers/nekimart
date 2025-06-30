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

const VendorRegistrationForm = () => {
  const { storeCustomizationSetting, loading } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const userInfo = getUserSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    mobile: userInfo?.phone || "",
    brandName: "",
    logo: null,
    aboutProduct: "",
    aadharCard: null,
    panCard: null,
    bankAccNumber: "",
    IFSC: "",
    accountHolderName: "",
    bankBranch: "",
  });

  // const uploadToCloudinary = async (file, fieldName) => {
  //   setUploadingFile((prev) => ({ ...prev, [fieldName]: true }));
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append(
  //       "upload_preset",
  //       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  //     );
  //     const response = await axios.post(
  //       process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Cloudinary upload error:", error);
  //     toast.error(`Failed to upload ${fieldName}. Please try again.`);
  //     return null;
  //   } finally {
  //     setUploadingFiles((prev) => ({ ...prev, [fieldName]: false }));
  //   }
  // };

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

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      // ✅ Send to your backend (including files)
      // const result = await requests.post("tele/Vendor/add", form, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // console.log("Backend response:", result);

      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "New Vendor Registration",
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          brandName: formData.brandName,
          aboutProduct: formData.aboutProduct,
          accountNumber: formData.bankAccNumber,
          IFSC: formData.IFSC,
          accountHolderName: formData.accountHolderName,
          bankBranch: formData.bankBranch,
        }),
      });

      const web3Result = await web3Response.json();
      console.log("Web3Forms response:", web3Result);

      toast.success(
        "Thanks For Submitting Vendor Registration. Our Team Will Get Back To You Soon."
      );

      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        mobile: userInfo?.phone || "",
        brandName: "",
        logo: null,
        aboutProduct: "",
        aadharCard: null,
        panCard: null,
        bankAccNumber: "",
        IFSC: "",
        accountHolderName: "",
        bankBranch: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Vendor Registration" description="Register as a Vendor">
      {/* <PageHeader
        headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
        title="Vendor Registration Form"
      /> */}
      {loading ? (
        <CMSkeleton />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8 mt-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-customColor px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Partner With Us Form
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
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        className="w-full"
                        required
                      />
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
                  onClick={() =>
                    setFormData({
                      name: userInfo?.name || "",
                      email: userInfo?.email || "",
                      mobile: userInfo?.phone || "",
                      brandName: "",
                      logo: null,
                      aboutProduct: "",
                      aadharCard: null,
                      panCard: null,
                      bankAccNumber: "",
                      IFSC: "",
                      accountHolderName: "",
                      bankBranch: "",
                    })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-4"
                  disabled={isSubmitting}
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-customColor hover:bg-customColorDark rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customColor disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
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

export default VendorRegistrationForm;
