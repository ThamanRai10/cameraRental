import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsBucketFill } from "react-icons/bs";

const UserMenu = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 w-52">
      <nav className="mt-2 flex-grow">
        <ul className="flex flex-col py-4 space-y-4">
          <li>
            <NavLink
              to={"/dashboard/user/profile"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <CgProfile className="mr-3  w-5 h-5" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/user/orders"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <BsBucketFill className="mr-3  w-5 h-5" />
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
