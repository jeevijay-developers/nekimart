'use client';

import React, { useState,useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";

//internal import
import CouponServices from "@services/CouponServices";
import OfferTimer from "@components/coupon/OfferTimer";
import useUtilsFunction from "@hooks/useUtilsFunction";
import CMSkeletonTwo from "@components/preloader/CMSkeletonTwo";
import { toast } from "react-toastify";



export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const announcements = coupons.map((c) =>
  //   c.discount > 0
  //     ? `${c.code} ${c.discount}% OFF on purchase of ₹${c.minimumAmount} & Above`
  //     : `${c.code} Free Shipping on orders above ₹${c.minimumAmount}`
  // );
  const [copiedCode, setCopiedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["coupon"],
    queryFn: async () => await CouponServices.getShowingCoupons(),
    // staleTime: 5 * 60 * 1000, //default cache for 5 minute, if you want to without cache then comment this and gcTime lines
    // gcTime: 5 * 60 * 1000,
  });
 const getCurrentSeason = () => {
   const month = new Date().getMonth() + 1;
   if (month >= 3 && month <= 6) return "☀️ Summer";
   if (month >= 7 && month <= 9) return "🌧️ Monsoon";
   return "❄️ Winter"; // Oct to Feb
 };
   const seasonPrefix = `${getCurrentSeason()} Deals Are Live!`;

  // console.log("coupon  data", data);
const announcements = [
  seasonPrefix,
  ...(data
    ?.filter((coupon) => dayjs(coupon.endTime).isAfter(dayjs())) // Filter out expired
    .map((coupon) => {
      const code = coupon.couponCode;
      const discount = coupon.discountType.value;
      const discountType = coupon.discountType.type;
      const minAmount = coupon.minimumAmount;
      const title = coupon.title.en || "Get";

      if (discountType === "percentage" && discount > 0) {
        return `${title} ${discount}% OFF on purchase of ₹${minAmount} | Use Code ${code}`;
      } else if (discountType === "fixed" && discount > 0) {
        return `${title} ₹${discount} OFF on purchase of ₹${minAmount}  | Use Code ${code}`;
      } else {
        return `${title} Free Shipping on orders above ₹${minAmount} | Use Code ${code}`;
      }
    }) || []),
];

  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
    // toast.success(`Copied "${code}" to clipboard! 🎉`, {
    //   position: "top-right",
    // });
  };

  // console.log("data in announcementbar", data);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === announcements.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="w-full bg-[#151144] text-[#eab676] h-9 md:h-7  flex items-center overflow-hidden">
      <CopyToClipboard
        text={data?.[currentIndex]?.couponCode}
        onCopy={() => handleCopied(data?.[currentIndex]?.couponCode)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${announcements.length * 100}%`,
          }}
        >
          {announcements.map((msg, idx) => (
            <div
              key={idx}
              className="flex items-center cursor-grab  active:cursor-grabbing justify-center flex-none w-full text-center font-medium text-xs sm:text-base md:text-sm"
            >
              {msg}
            </div>
          ))}
        </div>
      </CopyToClipboard>
    </div>
  );
}
