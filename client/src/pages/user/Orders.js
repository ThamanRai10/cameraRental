import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="dashboard">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/6">
            <UserMenu className="h-full bg-gray-900" />
          </div>
          <div className="w-full md:w-4/5">
            <h1 className="text-center text-2xl font-semibold">All Orders</h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Buyer</th>
                    <th className="px-4 py-2">Ordered Date</th>
                    <th className="px-4 py-2">Product Name</th> {/* New column */}
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Payment Method</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <tr className="text-center" key={i}>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{o?.status}</td>
                      <td className="px-4 py-2">{o?.buyer?.name}</td>
                      <td className="px-4 py-2">
                        {/* Check if createdAt exists and format date */}
                        {o?.createdAt &&
                          moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </td>
                      <td className="px-4 py-2">
                        {/* Check if products array exists and get its length */}
                        {o?.products ? o.products.map(p => p.name).join(", ") : ""}
                      </td>
                      <td className="px-4 py-2">
                        {/* Check if products array exists and get its length */}
                        {o?.products ? o.products.length : 0}
                      </td>
                      <td className="px-4 py-2">
                        {o?.payment?.success ? "Success" : "Failed"}
                      </td>
                      <td className="px-4 py-2">{o?.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
