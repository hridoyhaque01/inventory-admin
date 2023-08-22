import React, { useState } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SupplierTable from "../../components/tables/supplier/SupplierTable";
import { useGetSuppliersQuery } from "../../features/supplier/supplierApi";

function Suppliers() {
  const { data, isLoading, isError } = useGetSuppliersQuery();
  const [searchValue, setSearchValue] = useState("");

  console.log(data);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
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

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data?.length > 0) {
    const newData = data.filter(filterBySearch);
    content = <SupplierTable data={newData}></SupplierTable>;
  }

  return (
    <section className="h-full w-full overflow-auto pr-6 py-6">
      <div className="bg-whiteHigh shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Suppliers"
          path="/supplier-add"
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

export default Suppliers;
