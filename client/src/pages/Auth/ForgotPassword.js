import React from "react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import background from "../../images/background.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgotpassword", {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/login");
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
    <Layout title={"Forgot Password Ecommerece"}>
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
                Reset Password
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm  space-y-2">
                <div>
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
                  <input
                    id="answer"
                    name="answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
                    placeholder=" Which animal do you like the most?"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 ">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
