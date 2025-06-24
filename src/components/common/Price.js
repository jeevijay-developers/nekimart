import useUtilsFunction from "@hooks/useUtilsFunction";

const Price = ({ product, price, card, currency, originalPrice }) => {
  const { getNumberTwo } = useUtilsFunction();

  // Check if we have actual price values
  const currentPrice = price || product?.prices?.price;
  const actualOriginalPrice = originalPrice || product?.prices?.originalPrice;

  return (
    <div className="font-serif product-price font-bold">
      <>
        {actualOriginalPrice > currentPrice && (
          <span className="relative inline-block mr-1">
            <span className="relative inline-block mr-2 lg:mr-3 text-[10px] md:text-[12px] lg:text-sm text-gray-400 font-medium">
              MRP {currency}
              {getNumberTwo(actualOriginalPrice)}
              <span className="absolute left-0 top-5 w-full h-[1px] bg-gray-400 -translate-y-1/2 rotate-[-15deg] origin-left pointer-events-none"></span>
            </span>
          </span>
        )}
        <span
          className={
            card
              ? "inline-block text-lg font-semibold text-gray-800"
              : "inline-block text-2xl"
          }
        >
          {currency}
          {getNumberTwo(currentPrice)}
        </span>
      </>
    </div>
  );
};

export default Price;
