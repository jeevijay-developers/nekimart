import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";
import ReactToPrint from "react-to-print";
import { useQuery } from "@tanstack/react-query";

//internal import

import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import Invoice from "@components/invoice/Invoice";
import Loading from "@components/preloader/Loading";
import OrderServices from "@services/OrderServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import InvoiceForDownload from "@components/invoice/InvoiceForDownload";
import { notifyError, notifySuccess } from "@utils/toast";
import { useQueryClient } from "@tanstack/react-query";

const Order = ({ params }) => {
  const printRef = useRef();
  const orderId = params.id;

  const { data, error, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: async () => await OrderServices.getOrderById(orderId),
  });
  const queryClient = useQueryClient();
  const { showingTranslateValue, getNumberTwo, currency } = useUtilsFunction();
  const { storeCustomizationSetting, globalSetting } = useGetSetting();
  const statusBgColor = {
    Pending: "bg-yellow-100",
    Cancel: "bg-red-100",
    Processing: "bg-blue-100",
    Shipped: "bg-blue-100",
    Delivered: "bg-green-100",
    ReturnRequested: "bg-blue-100",
    ReturnRejected: "bg-red-100",
    Returned: "bg-green-100",
  };

  const statusTextColor = {
    Pending: "text-yellow-600",
    Cancel: "text-red-600",
    Processing: "text-blue-600",
    Shipped: "text-blue-600",
    Delivered: "text-green-600",
    ReturnRequested: "bg-blue-100",
    ReturnRejected: "text-red-600",
    Returned: "text-green-600",
  };

  const isSevenDaysPassed = () => {
    if (!data?.deliveryDate) {
      return false;
    }
    console.log("Return button clicked");
    const currentDate = new Date();
    const deliveryDate = new Date(data?.deliveryDate);

    // diff in days
    const diffINTime = currentDate.getTime() - deliveryDate.getTime();
    const diffInDays = diffINTime / (1000 * 3600 * 24);
    return diffInDays > 7;
  };
  const returnStatus =
    data?.status === "Delivered" ||
    data?.status === "Returned" ||
    data?.status === "ReturnRejected" ||
    data?.status === "ReturnRequested";
  const returnButtonDisabled =
    isSevenDaysPassed() ||
    data?.status == "Returned" ||
    data?.status == "ReturnRejected" ||
    data?.status === "ReturnRequested";

  const handleReturnRequest = async () => {
    await OrderServices.ReturnOrder(data?._id)
      .then((res) => {
        notifySuccess(res.message);
        // Refetch the order data
        queryClient.invalidateQueries(["order"]);
      })
      .catch((err) => {
        notifyError(err?.response?.data?.message || "Error while requesting return!");
        console.log("Error while requesting return:", err?.response?.data?.message);
      });
  };

  console.log("invoice data", data);

  return (
    <Layout title="Invoice" description="order confirmation page">
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : error ? (
        <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">
          {error}
        </h2>
      ) : (
        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div
            className={`${
              statusBgColor[data?.status] || "bg-gray-100"
            } rounded-md mb-5 px-4 py-3`}
          >
            <label
              className={`font-medium ${
                statusTextColor[data?.status] || "text-gray-700"
              }`}
            >
              {showingTranslateValue(
                storeCustomizationSetting?.dashboard?.invoice_message_first
              )}{" "}
              <span className="font-bold">{data?.user_info?.name},</span>{" "}
              {`Your order ${
                data?.status === "Pending"
                  ? "has been successfully placed!"
                  : data?.status === "Cancel"
                  ? "has been Cancelled!"
                  : data?.status === "Processing"
                  ? "is being processed!"
                  : data?.status === "Shipped"
                  ? "has been successfully out for delivery!"
                  : data?.status === "Delivered"
                  ? "has been successfully Delivered!"
                  : data?.status === "ReturnRequested"
                  ? "Return Request has been successfully placed!"
                  : data?.status === "ReturnRejected"
                  ? " Return Request has been Rejected!"
                  : data?.status === "Returned"
                  ? "Return has been successfully Completed!"
                  : data?.status
              }`}
            </label>
          </div>
          {/* return logic button here */}
          <div className="flex flex-row justify-end gap-3 ">
            {returnStatus && (
              <button
                onClick={handleReturnRequest}
                disabled={returnButtonDisabled}
                className={` p-3 mb-3 cursor-pointer bg-blue-600 rounded-full text-white  hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Return Order
              </button>
            )}
            {/* <button
              disabled={
                data?.status == "Returned" || data?.status == "Return Rejected"
              }
              className={`${
                data?.status === "Delivered" ||
                data?.status === "Returned" ||
                data?.status === "Return Rejected" ||
                data?.status === "Return Requested"
                  ? "block"
                  : "hidden"
              } p-3 cursor-pointer bg-customPink rounded-2xl text-white  hover:bg-blue-700`}
            >
              cancel Order
            </button> */}
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <Invoice
              data={data}
              printRef={printRef}
              currency={currency}
              globalSetting={globalSetting}
            />
            <div className="bg-white p-8 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-end invoice-btn">
                {/* <PDFDownloadLink
                  document={
                    <InvoiceForDownload
                      data={data}
                      currency={currency}
                      globalSetting={globalSetting}
                      getNumberTwo={getNumberTwo}
                    />
                  }
                  fileName="Invoice"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      "Loading..."
                    ) : (
                      <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500  text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                        {showingTranslateValue(
                          storeCustomizationSetting?.dashboard?.download_button
                        )}{" "}
                        <span className="ml-2 text-base">
                          <IoCloudDownloadOutline />
                        </span>
                      </button>
                    )
                  }
                </PDFDownloadLink> */}

                <ReactToPrint
                  trigger={() => (
                    <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500  text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                      {/* {showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.print_button
                      )}*/}
                      Print / Download Invoice
                      <span className="ml-2">
                        <IoPrintOutline />
                      </span>
                    </button>
                  )}
                  content={() => printRef.current}
                  documentTitle="Invoice"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
