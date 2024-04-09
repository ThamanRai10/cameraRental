import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 3000); // 3000ms or 3 seconds delay before redirecting to /Login
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-48 items-center">
            <div className="space-x-10 flex flex-shrink-0">
              <AiOutlineShop className=" text-white text-xl mt-[3px]" />
              <span className="text-white font-semibold"><NavLink to ="/">Camera Rental</NavLink></span>
            </div>
            <div className="hidden md:block">
              <div className="  flex items-baseline space-x-6">
                <NavLink
                  to="Product"
                  // activeClassName="text-white bg-gray-900"
                  className="text-gray-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </NavLink>
                <NavLink
                    to="/rentalPage"
                    className="text-gray-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rent 
                  </NavLink>

                <Badge count={cart?.length}>
                  <NavLink
                    to="/cart"
                    className="text-gray-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cart
                  </NavLink>
                </Badge>
                
                 
                
                
                <SearchInput  />
              </div>
            </div>
          </div>
          {!auth.user ? (
            <>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <NavLink
                    to="/register"
                    type="button"
                    className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    type="button"
                    className="ml-3 bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden relative text-left lg:block">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="uppercase inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border rounded-md shadow-sm hover:bg-gray-700"
                  id="dropdown-menu"
                  aria-expanded={isOpen ? "true" : "false"}
                  aria-haspopup="true"
                >
                  {auth?.user?.name}

                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-600 ring-1 text-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-menu"
                  >
                    <div className="py-1" role="none">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2 text-sm  hover:bg-gray-800 "
                        role="menuitem"
                      >
                        Dashboard
                      </NavLink>

                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        type="button"
                        className="mt-2 ml-2 bg-red-600 hover:bg-red-700 duration:500 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/Product"
            className="text-gray-300 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </NavLink>

          {/* <NavLink
                    to="/rentalPage"
                    className="text-gray-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rent
                  </NavLink> */}

          <Badge count={cart?.length}>
            <NavLink
              to="/cart"
              className="text-gray-300 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Cart
            </NavLink>
          </Badge>

          
                 
               

          <SearchInput />
        </div>
        {!auth.user ? (
          <>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <NavLink
                  to="/register"
                  type="button"
                  className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  type="button"
                  className="ml-3 bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative inline-block text-left  p-2">
              <button
                type="button"
                onClick={toggleDropdown}
                className=" p-2 uppercase inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border rounded-md shadow-sm hover:bg-gray-700"
                id="dropdown-menu"
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                {auth?.user?.name}

                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  className="origin-top-right absolute left-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-menu"
                >
                  <div className="py-1" role="none">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      type="button"
                      className="ml-3 bg-red-600 hover:bg-red-700 duration:500 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
