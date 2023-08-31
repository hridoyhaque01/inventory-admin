import React from "react";
import { loader } from "../../assets/getAssets";

function SearchLoader() {
  return (
    <div className="px-6 py-4 flex items-center justify-center w-full h-full">
      <div className="w-[30rem]">
        <img src={loader} alt="" />
      </div>
    </div>
  );
}

export default SearchLoader;
