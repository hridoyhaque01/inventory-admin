import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import SalesTable from "../../components/tables/sales/SalesTable";
import { useGetSalesQuery } from "../../features/sales/salesApi";
import { useGetStoresQuery } from "../../features/store/storeApi";

function Sales() {
  const [selectedShop, setSelectedShop] = useState("All Shop");
  const { data, isLoading, isError } = useGetSalesQuery();
  const {
    data: stores,
    isLoading: storeLoading,
    isError: storeError,
  } = useGetStoresQuery();

  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.productName
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  const filterByStoreName = (data) => {
    if (selectedShop === "All Shop") {
      return true;
    } else {
      return data?.storeName
        ?.toLowerCase()
        .includes(selectedShop?.toLowerCase());
    }
  };

  let content = null;

  if (isLoading || storeLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && (isError || storeError)) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && (!isError || !storeError) && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && (!isError || !storeError) && data?.length > 0) {
    const newData = [...data]
      ?.sort(sortByTime)
      ?.filter(filterBySearch)
      .filter(filterByStoreName);
    content = <SalesTable data={newData}></SalesTable>;
  }
  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="bg-whiteHigh shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="tableTitle.sales"
          path="/sales-add"
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        >
          <div className="dropdown dropdown-bottom z-50">
            <label
              tabIndex={0}
              className="text-whiteHigh flex items-center gap-1 cursor-pointer  text-sm md:text-base whitespace-nowrap"
            >
              <span>
                {selectedShop === "All Shop" ? t("allShop") : selectedShop}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.6468 13.229L12 13.5814L12.3532 13.229L16.5896 9.00173L17.2929 9.70501L12 14.9979L6.70711 9.70501L7.41039 9.00173L11.6468 13.229Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-1 shadow bg-whiteHigh rounded w-36 sm:w-48 mt-2 text-sm md:text-base whitespace-nowrap overflow-visible"
            >
              <li onClick={() => setSelectedShop("All Shop")}>
                <p>{t("allShop")}</p>
              </li>
              {!storeLoading &&
                stores?.map((store, i) => (
                  <li onClick={() => setSelectedShop(store?.name)} key={i}>
                    <p>{store?.name}</p>
                  </li>
                ))}
            </ul>
          </div>
        </SearchBar>

        <div className="h-[calc(100%-80px)] overflow-auto flex flex-col justify-between flex-wrap pb-4">
          {content}
        </div>
      </div>
    </section>
  );
}

export default Sales;
