import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/shared/SideNav/SideNav";
import TopNav from "../components/shared/TopNav/TopNav";

const Main = () => {
  return (
    <div className="bg-whiteSemi h-screen w-full overflow-hidden">
      <TopNav isShowButton={true}></TopNav>
      <div className="flex h-[calc(100%-66px)]">
        <SideNav></SideNav>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
