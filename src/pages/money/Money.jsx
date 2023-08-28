import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import MoneyOwedTable from "../../components/tables/moneyOwed/MoneyOwedTable";
import { useGetAllOwesQuery } from "../../features/owes/owesApi";
import { useGetStoresQuery } from "../../features/store/storeApi";

function Expenses() {
  const { data, isLoading, isError } = useGetAllOwesQuery();
  const [searchValue, setSearchValue] = useState("");
  const [selectedShop, setSelectedShop] = useState("All Shop");
  const {
    data: stores,
    isLoading: storeLoading,
    isError: storeError,
  } = useGetStoresQuery();
  const { t } = useTranslation();

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    return b.payDate - a.payDate;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.customerId
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  const filterByDue = (data) => {
    return parseInt(data?.dueAmount) !== 0;
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
      ?.filter(filterByDue)
      ?.sort(sortByTime)
      ?.filter(filterBySearch)
      ?.filter(filterByStoreName);
    content = <MoneyOwedTable data={newData}></MoneyOwedTable>;
  }
  return (
    <section className="h-full w-full overflow-auto pr-6 py-6">
      <div className="bg-whiteHigh shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="tableTitle.owes"
          path="/moneyOwed-add"
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        >
          <div className="dropdown dropdown-bottom">
            <label
              tabIndex={0}
              className="text-whiteHigh flex items-center gap-1 cursor-pointer"
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
              className="dropdown-content z-[1] menu p-2 shadow bg-whiteHigh rounded w-48 mt-2"
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

export default Expenses;
