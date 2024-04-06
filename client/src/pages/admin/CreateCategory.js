import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  //Handle Delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Category is Deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is Created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Form");
    }
  };

  // Get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Create Category"}>
      <div className="mx-auto">
        <div className="flex">
          <div className="">
            <AdminMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">
            <h1 className="text-2xl text-center font-bold mb-4">
              Manage Category
            </h1>
            <div className="bg-gray-300 rounded-lg shadow p-2 w-[60%] ml-auto mr-auto">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
              <table className=" mt-8">
                <thead className="">
                  <tr className="ml-9 flex justify-between space-x-96">
                    <th className="py-4">Category</th>
                    <th className="py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td className="py-2">
                        <div className="flex justify-between items-center ml-9">
                          <div className="font-semibold uppercase">
                            {c.name}
                          </div>
                          <div className="flex space-x-4 -mr-16">
                            <button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              className="bg-blue-500  text-white rounded w-20 px-4 py-2 "
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                              className="bg-red-500  text-white rounded w-20 px-4 py-2 "
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
