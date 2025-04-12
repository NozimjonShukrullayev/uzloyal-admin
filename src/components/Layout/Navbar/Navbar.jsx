import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../menuSlice/menuSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeMenu = useSelector((state) => state.activeMenu);

  const menuMap = {
    "/": "dashboard",
    "/categories": "categories",
    "/faqs": "faqs",
    "/news": "news",
    "/blogs": "blogs",
    "/services": "services",
    "/sources": "sources",
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuMap[currentPath] || "dashboard";
    dispatch(setActiveMenu(activeMenuItem));
  }, [location, dispatch]);

  return (
    <div className="py-2 px-6 w-[85%] h-[80px]  bg-[#f8f4f3]  flex items-center shadow-md shadow-black/5 absolute top-0 right-0 z-30">
      <span className=" text-1xl flex items-start flex-col">
        <span>
          <span className="text-gray-800 mr-2 font-bold">ADMINPANEL</span>
          <span className="bg-[#f84525] text-white px-2 font-bold rounded-md">
            UZLOYAL
          </span>
        </span>
        <span className="text-gray-400 capitalize">{activeMenu}</span>
      </span>
      <ul className="ml-auto flex items-center">
        <li className="mr-1 dropdown">
          <button
            type="button"
            className="dropdown-toggle text-black mr-4 w-15 h-15 rounded flex items-center justify-center"
          >
            <IoMdSettings className="size-6" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
