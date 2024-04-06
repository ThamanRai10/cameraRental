import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    filterProduct();
  }, []);

  // Get All Products
  const allProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Get total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //Filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) allProduct();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Get Filter
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Product - Best offers"}>
      <div className="flex flex-col lg:flex-row pt-5">
        <div className="w-full lg:w-1/4 m-2">
          <h1 className="text-center font-sans font-semibold text-xl">
            Filter by category
          </h1>
          <div className="flex flex-col ">
            {categories?.map((c) => (
              <label key={c._id} className="flex items-center space-x-2   mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 "
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
                <span className="text-gray-700">{c.name}</span>
              </label>
            ))}
          </div>

          {/* Price Filter */}

          <h1 className="mt-5 text-center font-semibold text-xl">
            Filter by Price
          </h1>

          <div className="flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className="mb-2" key={p._id}>
                  <Radio
                    className="inline-flex items-center space-x-2"
                    value={p.array}
                  >
                    <span className="text-gray-700">{p.name}</span>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="mt-5 ml-2 flex flex-col">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white rounded w-32 px-4 py-2"
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <h1 className="text-center font-bold text-3xl">All Product</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            {products?.map((p) => (
              <div
                className="border  flex flex-col items-center"
                key={p._id}
              >
                <img
                  className="w-[50%] h-[50%] object-cover mb-4"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="text-center">
                  <h5 className="font-semibold">{p.name}</h5>
                  <p className="text-sm">{p.description.substring(0, 40)}</p>
                  <p className="text-sm"> $ {p.price}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded"
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p ])
                        );
                        toast.success("Item Added in the Cart");
                      }}
                      className="bg-gray-500 text-sm  hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 m-3 p-3">
            {products && products.length < total && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
