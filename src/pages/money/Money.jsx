import React from "react";
import { Pagination } from "../../components/shared/pagination/Pagination";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import MoneyOwedTable from "../../components/tables/moneyOwed/MoneyOwedTable";

function Expenses() {
  // const { data } = useSelector((state) => state.inventories);
  // console.log(data);
  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar title="Money Owed" path="/moneyOwed-add"></SearchBar>

        <div className="h-[calc(100%-80px)] overflow-auto flex flex-col justify-between pb-4">
          <div>
            <MoneyOwedTable></MoneyOwedTable>
          </div>
          <Pagination></Pagination>
        </div>
      </div>
    </section>
  );
}

export default Expenses;
