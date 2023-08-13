import React from "react";
import { Link } from "react-router-dom";
import { error } from "../../assets/getAssets";

function Error() {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-10">
          <div className="w-full max-w-[640px] mx-auto">
            <img src={error} alt="" className="w-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Page Not Found</h2>
          <Link
            to="/"
            className="btn rounded-full bg-primaryMainLight hover:bg-primaryMainLight border-secondaryColor hover:border-primaryMainLight text-whiteHigh w-full max-w-max normal-case font-normal"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error;
