import React from "react";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={" Go Back! Page Not Found"}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
