import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const OrderDetails = () => {
  const [auth] = useAuth();
  const [selectedUserName, setSelectedUserName] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    productName: "",
    quantity: "",
    // Add more fields as needed
  });

  const handleUserNameChange = (event) => {
    setSelectedUserName(event.target.value);
  };

  const handleOrderDetailsChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the order details to the server to save
      await axios.post("/api/v1/auth/create-order", {
        userName: selectedUserName,
        orderDetails: orderDetails,
      });
      // Reset form fields after successful submission
      setSelectedUserName("");
      setOrderDetails({
        productName: "",
        quantity: "",
        // Reset other fields as needed
      });
      alert("Order details submitted successfully!");
    } catch (error) {
      console.error("Error submitting order details:", error);
      alert("Failed to submit order details. Please try again.");
    }
  };

  return (
    <Layout title={"Order Details"}>
      <div className="mx-auto">
        <div className="flex">
          <div className="">
            <AdminMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
              <h1 className="text-xl font-bold mb-4">Order Details</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="userName" className="block text-sm font-bold mb-2">
                    Select User Name
                  </label>
                  <select
                    id="userName"
                    name="userName"
                    value={selectedUserName}
                    onChange={handleUserNameChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  >
                    {/* Populate options dynamically */}
                    <option value="">Select User Name</option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-sm font-bold mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={orderDetails.productName}
                    onChange={handleOrderDetailsChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={orderDetails.quantity}
                    onChange={handleOrderDetailsChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                {/* Add more input fields for other order details */}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
