import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProduct] = useState([]);

  // Get All Products
  const allProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    allProduct();
  }, []);

  return (
    <Layout title={"Product "}>
      <div className="mx-auto">
        <div className="flex">
          <div className="w-1/6 h-screen">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <h1 className="text-center font-serif text-2xl">
              All Product List
            </h1>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                  className="border p-4 flex flex-col items-center"
                >
                  <img
                    className="w-32 h-32 object-cover mb-4"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="text-center">
                    <h5 className="font-semibold">{p.name}</h5>
                    <p className="text-sm">{p.description}</p>
                    <p className="text-sm">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
