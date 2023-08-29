import React, { useState } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import StoreTable from "../../components/tables/store/StoreTable";
import { useGetStoresResultQuery } from "../../features/store/storeApi";

function Store() {
  // const { data, isLoading, isError } = useGetStoresQuery();
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError } = useGetStoresResultQuery();

  const { resultData } = data || {};

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data.name.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && resultData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && resultData?.length > 0) {
    const newData = [...resultData]?.sort(sortByTime)?.filter(filterBySearch);
    content = <StoreTable data={newData}></StoreTable>;
  }

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="bg-whiteHigh shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="tableTitle.store"
          path="/store-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-80px)] overflow-auto flex flex-col justify-between flex-wrap pb-4">
          {content}
        </div>
      </div>
    </section>
  );
}

export default Store;
