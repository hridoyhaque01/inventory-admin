import React, { useState } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import CustomerTable from "../../components/tables/customer/CustomerTable";
import { useGetCustomersQuery } from "../../features/customers/customerApi";

function Customer() {
  const { data, isLoading, isError } = useGetCustomersQuery();
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.customerPhone
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data?.length > 0) {
    const newData = data?.filter(filterBySearch);
    content = <CustomerTable data={newData}></CustomerTable>;
  }
  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm bg-whiteHigh w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Customer"
          path="/customer-add"
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        ></SearchBar>

        <div className="h-[calc(100%-80px)] overflow-auto flex flex-col justify-between flex-wrap pb-4">
          {content}
        </div>
      </div>
    </section>
  );
}

export default Customer;
