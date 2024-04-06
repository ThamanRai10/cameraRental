import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import background from "../../images/background.png";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 3000); // 3000ms or 3 seconds delay before redirecting to /Login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Register Ecommerece"}>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100">
          <div className="h-1/2 w-full ">
            <img
              src={background}
              alt="background"
              className="overflow-hidden md:w-auto h-full"
            />
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Login to your account
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm  space-y-2">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div className="text-end">
                  <NavLink
                    to={"/forgot-password"}
                    onClick={() => {
                      navigate("/forgot-password");
                    }}
                    className="text-blue-500 hover:text-blue-700 text-right font-semibold">
                    Forgot Password
                  </NavLink>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 ">
                  Login
                </button>

                <div className="flex items-center justify-between">
                  <p className="mt-8 text-xs font-light text-center text-black">
                    {" "}
                    Don't Have Account?{" "}
                    <NavLink
                      to="/register"
                      className="font-medium text-blue-600 hover:underline">
                      Create it here
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
