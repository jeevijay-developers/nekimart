import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormalTrouser from "src/formal-trouser/FormalTrouser";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

//internal import
import Layout from "@layout/Layout";
import Banner from "@components/banner/Banner";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import FeatureCategory from "@components/category/FeatureCategory";
import AttributeServices from "@services/AttributeServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import Testimonials from "@components/Testimonials/Testimonials";
import ClassicShirtCard from "@components/classic-shirt/classicShirtCard";
import WhyChooseUs from "@components/whyChooseUs/WhyChooseUs";
import ShirtGallery from "@components/shirt-gallery/ShirtGallery";

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  const [productsToShow, setProductsToShow] = useState(4);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [discountedProductsToShow, setDiscountedProductsToShow] = useState(4);
  const [showLoadMoreDiscounted, setShowLoadMoreDiscounted] = useState(true);

  const handleLoadMore = () => {
    const nextProducts = productsToShow + 4;
    setProductsToShow(nextProducts);
    if (nextProducts >= popularProducts.length) {
      setShowLoadMore(false);
    }
  };

  const handleLoadMoreDiscounted = () => {
    const nextProducts = discountedProductsToShow + 4;
    setDiscountedProductsToShow(nextProducts);
    if (nextProducts >= discountProducts.length) {
      setShowLoadMoreDiscounted(false);
    }
  };

  AOS.init();
  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            {/* <StickyCart /> */}
            <div className="bg-white">
              <div className="mx-auto py-1">
                {" "}
                {/* max-w-screen-2xl */}
                <div className="flex w-full">
                  <div className="flex-shrink  lg:block w-full ">
                    <MainCarousel />
                  </div>
                  {/* <div className="w-full hidden lg:flex">
                    <OfferCard />
                  </div> */}
                </div>
                {/* {storeCustomizationSetting?.home?.promotion_banner_status && (
                  <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                    <Banner />
                  </div>
                )} */}
              </div>
            </div>

            {/* feature category's */}
            {storeCustomizationSetting?.home?.featured_status && (
              // <div className="bg-gray-100 lg:py-16 py-10"> removed this part with below part
              <div className="bg-gray-100 ">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          loading={loading}
                          data={storeCustomizationSetting?.home?.feature_title}
                        />
                      </h2>
                      {/* <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={4}
                          height={10}
                          error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home?.feature_description
                          }
                        />
                      </p> */}
                    </div>
                  </div>

                  {/* <FeatureCategory /> */}
                </div>
              </div>
            )}

            {/* popular products */}
            {storeCustomizationSetting?.home?.popular_products_status && (
              <div className=" bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex ">
                  <div className=" w-full lg:w-2/5">
                    <h2 className="font-[lora] font-thin text-[2rem] ml-4 md:ml-8 lg:ml-12 lg:text-[3.25rem] mb-2">
                    Bestseller
                      <CMSkeleton
                        count={1}
                        height={30}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.popular_title}
                      />
                    </h2>
                    {/* <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={10}
                        error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.popular_description
                        }
                      />
                    </p> */}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 justify-center px-2 sm:px-4">
                          {popularProducts
                            ?.slice(0, productsToShow)
                            .map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                                attributes={attributes}
                              />
                            ))}
                        </div>
                        {showLoadMore && popularProducts.length > 4 && (
                          <div className="flex justify-center mt-8">
                            <button
                              onClick={handleLoadMore}
                              className="bg-customPink text-white px-6 py-3 rounded-md hover:bg-customPinkDark transition-colors duration-300 font-medium text-sm sm:text-base"
                            >
                              View More
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* promotional banner card */}
            {/* {storeCustomizationSetting?.home?.delivery_status && (
              <div className="block mx-auto max-w-screen-2xl">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                  <div className="lg:p-16 p-6 bg-customPink shadow-sm border rounded-lg">
                    <CardTwo />
                  </div>
                </div>
              </div>
            )} */}

            {/* Classic Plain Shirt */}
            <div>
              <h1 className="px-6 font-[lora] text-[1.75rem] md:text-[2.25rem] lg:text-[3rem] text-center">
                Classic Shirts
              </h1>
              <ClassicShirtCard />
            </div>

            <div className="mt-[4.5rem] hover:cursor-pointer">
              <FormalTrouser />
            </div>

            <WhyChooseUs />
            <ShirtGallery />

            {/* discounted products */}
            {storeCustomizationSetting?.home?.discount_product_status &&
              discountProducts?.length > 0 && (
                <div
                  id="discount"
                  className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
                >
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="px-6 font-[lora] text-[1.75rem] md:text-[2.25rem] lg:text-[3rem] text-center ">
                        <CMSkeleton
                          count={1}
                          height={30}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_title
                          }
                        />
                      </h2>
                      {/* <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={5}
                          height={20}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_description
                          }
                        />
                      </p> */}
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-5">
                    <div className="w-full">
                      {loading ? (
                        <CMSkeleton
                          count={20}
                          height={20}
                          error={error}
                          loading={loading}
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 justify-center px-2 sm:px-4">
                          {discountProducts
                            ?.slice(0, discountedProductsToShow)
                            .map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                                attributes={attributes}
                              />
                            ))}
                        </div>
                      )}
                      {showLoadMoreDiscounted && discountProducts.length > 4 && (
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={handleLoadMoreDiscounted}
                            className="bg-customPink text-white px-6 py-3 rounded-md hover:bg-customPinkDark transition-colors duration-300 font-medium text-sm sm:text-base"
                          >
                            View More
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
          <Testimonials />
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      attributes,
      cookies: cookies,
      popularProducts: data.popularProducts,
      discountProducts: data.discountedProducts,
    },
  };
};

export default Home;
