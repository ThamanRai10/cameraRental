import React from "react";
import { NavLink } from "react-router-dom";
import { BsBucketFill, BsFillCartFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { BiSolidUserCircle } from "react-icons/bi";

const AdminMenu = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 w-52">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-white text-lg font-semibold">Admin Panel</span>
      </div>
      <nav className="mt-2 flex-grow">
        <ul className="flex flex-col py-4 space-y-4">
          <li>
            <NavLink
              to={"/dashboard/admin/create-category"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <IoIosCreate className="mr-3  w-5 h-5" />
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/admin/create-product"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <IoIosCreate className="mr-3  w-5 h-5" />
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/admin/products"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <BsFillCartFill className="mr-3  w-5 h-5" />
              All Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/dashboard/admin/orders"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <BsBucketFill className="mr-3  w-5 h-5" />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/admin/users"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <BiSolidUserCircle className="mr-3  w-5 h-5" />
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
