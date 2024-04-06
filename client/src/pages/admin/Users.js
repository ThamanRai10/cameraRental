import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-users");
        setUsers(response.data.filter((user) => user.role !== 1));
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <Layout title={"All Users"}>
      <div className="mx-auto">
        <div className="bg-gray-100 flex flex-col md:flex-row">
          <div className="w-full md:w-1/5">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-center text-2xl font-semibold my-6">
              All Users
            </h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="text-center">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 uppercase">{user.name}</td>
                      <td className="px-4 py-2">{user.address}</td>
                      <td className="px-4 py-2">{user.phone}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{user.email}</td>
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

export default Users;
