import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard Admin"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <AdminMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
              <h1 className="text-xl font-bold mb-4">
                Admin Name: {auth?.user?.name}
              </h1>
              
              <h1 className="text-lg">Admin Email: {auth?.user?.email}</h1>
              <h1 className="text-lg">Admin Phone: {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
