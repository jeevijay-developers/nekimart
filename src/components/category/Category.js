import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

//internal import
import { pages } from "@utils/data";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@components/category/CategoryCard";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Category = () => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const router = useRouter();

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  // Add this handler function
  const handlePageClick = (href) => {
    router.push(href);
    closeCategoryDrawer(); // Close the drawer when page link is clicked
  };

  // console.log("data", data, "error", error, "isFetched", isFetched);
  const userInfo = getUserSession();
  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-2 bg-customColor text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
            <Link href="/" className="mr-6 h-full">
              <img
                src="/logo/logo.png"
                alt="logo"
                width={50}
                height={30}
                className="object-contain bg-white"
              />
            </Link>
          </h2>

          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
            All Categories
          </h2>
        )}
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            {error?.response?.data?.message || error?.message}
          </p>
        ) : (
          <div className="relative grid gap-2 p-6">
            {data[0]?.children?.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                icon={category.icon}
                nested={category.children}
                title={showingTranslateValue(category?.name)}
              />
            ))}
          </div>
        )}

        {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
              Pages
            </h3>
            <div className="relative grid gap-1 p-6">
              {pages.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handlePageClick(item.href)}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-customColor text-left"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium w-full">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
