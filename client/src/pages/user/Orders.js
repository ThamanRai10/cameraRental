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
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <tr className="text-center" key={i}>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{o?.status}</td>
                      <td className="px-4 py-2">{o?.buyer?.name}</td>
                      <td className="px-4 py-2">
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className="px-4 py-2">{o?.products?.length}</td>
                      <td className="px-4 py-2">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders?.map((o, i) => (
              <div className="border shadow-md mb-4 mt-8" key={i}>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="flex mb-2 p-3 card" key={p._id}>
                      <div className="w-1/4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="w-3/4">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
