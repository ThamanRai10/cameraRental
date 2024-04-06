import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = ({ path = "login" }) => {
  const [count, setCount] = useState(3); // Set initial count value
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1); // Decrement count value
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      }); // Redirect when count reaches 0
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [count, navigate, location, path]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-7">
        <div className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <h1 className="mt-4 text-center font-mono uppercase font-semibold text-2xl">
          Redirecting to Login Page in {count}
        </h1>
      </div>
    </div>
  );
};

export default Loading;
