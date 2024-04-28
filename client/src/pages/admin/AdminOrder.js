import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrder = () => {
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [paymentMethods] = useState(["Cash in Hand", "Card Payment"]);

  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      // Update the specific order's status in the orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: value } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePaymentMethod = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/payment-status/${orderId}`, {
        paymentStatus: value,
      });
      // Update the specific order's payment status in the orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: value } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders"}>
      <div className="mx-auto">
        <div className="flex">
          <div className="w-1/5">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <h1 className="text-center text-2xl font-semibold my-6">
              All Orders
            </h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Buyer</th>
                    <th className="px-4 py-2">Ordered Date</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <tr className="text-center" key={i}>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          value={o?.status} // Add value prop to set the selected value correctly
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-4 py-2">{o?.buyer?.name}</td>
                      <td className="px-4 py-2">
                        {moment(o?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </td>
                      <td className="px-4 py-2">{o?.products[0]?.name}</td>
                      <td className="px-4 py-2">{o?.products?.length}</td>
                      <td className="px-4 py-2">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                
                      <Select
                          bordered={false}
                          onChange={(value) => handleChangePaymentMethod(o._id, value)}
                          defaultValue={o?.paymentStatus} // Remove defaultValue
                          value={o?.paymentStatus} // Remove value
                        >
                          {paymentMethods.map((method, i) => (
                            <Option key={i} value={method}>
                              {method}
                            </Option>
                          ))}
                        </Select>
                    
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

export default AdminOrder;
