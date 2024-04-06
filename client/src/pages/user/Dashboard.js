import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User Dashboard"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <UserMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">
            <div className=" bg-white shadow-lg rounded-lg p-6 w-96">
              <h1>User Name: {auth?.user?.name}</h1>
              <h1>User Email: {auth?.user?.email}</h1> 
              <h1>User Address: {auth?.user?.address}</h1>
              <h1>User Phone No.: {auth?.user?.phone}</h1>{" "}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
