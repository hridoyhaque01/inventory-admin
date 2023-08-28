import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/shared/TopNav/TopNav";

const SecondaryLayout = () => {
  return (
    <div className="bg-whiteSemi h-screen w-full overflow-hidden">
      <TopNav isShowButton={false}></TopNav>
      <div className="flex gap-6 h-[calc(100%-66px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default SecondaryLayout;
