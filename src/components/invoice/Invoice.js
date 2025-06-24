import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
//internal import
import OrderTable from "@components/order/OrderTable";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Invoice = ({ data, printRef, globalSetting, currency }) => {
  // console.log("invoice data", data);
  const { getNumberTwo } = useUtilsFunction();
  // console.log("GST in invoice",data.cart[0].prices.gst)
  return (
    <div ref={printRef}>
      <div className="bg-indigo-50 p-8 rounded-t-xl">
        <div className="flex sm:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div className=" text-left">
            <h2 className="text-lg font-serif font-semibold mt-4 lg:mt-0 md:mt-0">
              <Link href="/">
                <img
                  className="inline-block"
                  width={110}
                  height={40}
                  src="/logo/logo.png"
                  alt="logo"
                />
              </Link>
            </h2>

            <div className="text-sm  text-gray-500">
              <>{globalSetting?.company_name}</>
              <p className="whitespace-pre-wrap  break-words  lg:max-w-56 ">
                {globalSetting?.address}
                {globalSetting?.post_code}
              </p>
              <span></span>
              <>Email: {globalSetting?.email}</>
              <br />
              <>Phone:{globalSetting?.contact}</>
              <>
                {globalSetting?.city} {globalSetting?.state}
              </>
            </div>
          </div>
          <div>
            <h1 className="font-bold font-serif text-2xl mt-4 sm:mt-0 uppercase ">
              Invoice
            </h1>
            {/* <h6 className="text-gray-700">
              Status :{" "}
              {data.status === "Delivered" && (
                <span className="text-emerald-500">{data.status}</span>
              )}
              {data.status === "POS-Completed" && (
                <span className="text-emerald-500">{data.status}</span>
              )}
              {data.status === "Pending" && (
                <span className="text-orange-500">{data.status}</span>
              )}
              {data.status === "Cancel" && (
                <span className="text-red-500">{data.status}</span>
              )}
              {data.status === "Processing" && (
                <span className="text-indigo-500">{data.status}</span>
              )}
              {data.status === "Deleted" && (
                <span className="text-red-700">{data.status}</span>
              )}
            </h6> */}
            <div className="flex flex-row flex-wrap justify-between gap-4 pt-4">
              {/* Invoice Date */}
              <div className="flex flex-col items-center">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500">
                  {"Invoice Date"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.createdAt !== undefined && (
                    <span>{dayjs(data?.createdAt).format("MMMM D, YYYY")}</span>
                  )}
                </span>
              </div>

              {/* Invoice Status */}
              <div className="flex flex-col">
                <span className="font-bold items-center font-serif text-sm uppercase text-gray-600 dark:text-gray-500">
                  {"Invoice Status"}
                </span>
                <span className="text-xs mt-1 text-gray-500 flex justify-center ">
                  {data.status === "Delivered" && (
                    <span className="text-emerald-500">{data.status}</span>
                  )}
                  {data.status === "POS-Completed" && (
                    <span className="text-emerald-500">{data.status}</span>
                  )}
                  {data.status === "Pending" && (
                    <span className="text-orange-500">{data.status}</span>
                  )}
                  {data.status === "Cancel" && (
                    <span className="text-red-500">{data.status}</span>
                  )}
                  {data.status === "Processing" && (
                    <span className="text-indigo-500">{data.status}</span>
                  )}
                  {data.status === "Shipped" && (
                    <span className="text-indigo-500">{data.status}</span>
                  )}
                  {data.status === "ReturnRequested" && (
                    <span className="text-orange-500">Return Requested</span>
                  )}
                  {data.status === "ReturnRejected" && (
                    <span className="text-red-500">Return Rejected</span>
                  )}
                  {data.status === "Returned" && (
                    <span className="text-indigo-500">Returned</span>
                  )}

                  {data.status === "Deleted" && (
                    <span className="text-red-700">{data.status}</span>
                  )}
                </span>
              </div>

              {/* Invoice Number */}
              <div className="flex flex-col">
                <span className="font-bold items-center font-serif text-sm uppercase text-gray-600 dark:text-gray-500">
                  {"Invoice No"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  #{data?.invoice}
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-4 text-left">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                Ship To:
              </span>
              <span className="text-sm text-gray-500 block">
                {data?.user_info?.name} <br />
                {data?.user_info?.address}
                <br />
                {data.user_info?.city}, {data.user_info?.state},{" "}
                {data.user_info?.country}
                {". "}
                {data.user_info?.zipCode}
                <br />
                {data?.user_info?.landmark && (
                  <>
                    <strong>Landmark: </strong>
                    {data.user_info.landmark}
                    <br />
                  </>
                )}
                {data?.user_info?.email && (
                  <>
                    <strong>Email:</strong> {data.user_info.email}
                    <br />
                  </>
                )}
                {data?.user_info?.contact && (
                  <span className="">
                    <strong>Phone:</strong> {data.user_info.contact}
                  </span>
                )}
                <br />
              </span>
            </div>
          </div>
        </div>
        {/* <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              Date
            </span>
            <span className="text-sm text-gray-500 block">
              {data.createdAt !== undefined && (
                <span>{dayjs(data?.createdAt).format("MMMM D, YYYY")}</span>
              )}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              Invoice No.
            </span>
            <span className="text-sm text-gray-500 block">
              #{data?.invoice}
            </span>
          </div>
        </div> */}
      </div>
      <div className="s">
        <div className="overflow-hidden lg:overflow-visible px-8 my-10">
          <div className="-my-2 overflow-x-auto">
            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-xs bg-gray-100">
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    Sr.
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Item Price
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Gst(%)
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <OrderTable data={data} currency={currency} />
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-100 p-10 bg-emerald-50">
        <div className="flex sm:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Payment Method
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {data?.paymentMethod}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Shipping Cost
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {currency}
              {getNumberTwo(data.shippingCost)}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Discount
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {currency}
              {getNumberTwo(data.discount)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Total Amount
            </span>
            <span className="text-2xl font-serif font-bold text-red-500 block">
              {currency}
              {getNumberTwo(data.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
