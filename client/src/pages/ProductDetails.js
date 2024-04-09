import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilar(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout>
      <div className="flex flex-wrap w-full p-3">
        <div className="w-full md:w-1/2">
          <img
            className="w-11/12 md:w-9/12 lg:w-8/12 h-auto object-cover mx-auto mb-4"
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">Product Details</h1>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Product Name:</h2>
            <p className="text-xl">{product.name}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Product Description:</h2>
            <p className="text-xl">{product.description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Price:</h2>
            <p className="text-xl">Rs {product.price}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Product Category:</h2>
            <p className="text-xl">{product.category?.name}</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-sm hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-sans font-semibold text-center underline">
          Similar Products
        </h1>
        {similar.length < 1 && (
          <p className="text-center mt-8 text-gray-500 text-lg">
            No Similar Products Found
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {similar?.map((p) => (
            <div
              className="border p-4 flex flex-col items-center rounded-lg shadow-lg"
              key={p._id}
            >
              <img
                className="w-48 h-48  mb-4"
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="text-center">
                <h5 className="font-semibold">{p.name}</h5>
                <p className="text-sm">{p.description.substring(0, 40)}</p>
                <p className="text-sm">Rs {p.price}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Link
                    to={`/product/${p.slug}`}
                    className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded"
                  >
                    See Details
                  </Link>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-red-500 hover:bg-gray-700 text-sm text-white font-semibold py-2 px-4 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
