import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout title={"Search Result"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Search Result</h1>
          <h1 className="text-2xl mt-2">
            {values?.results.length < 1 ? (
              "No Product Found"
            ) : (
              <>
                Found {values?.results.length}{" "}
                {values?.results.length === 1 ? "Product" : "Products"}
              </>
            )}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            {values?.results.map((product) => (
              <div className="border flex flex-col items-center" key={product._id}>
                <a href={`/product/${product.slug}`}>
                  <img
                    className="w-48 h-48 mb-4"
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                </a>
                <div className="text-center">
                  <h5 className="font-semibold">{product.name}</h5>
                  <p className="text-sm">{product.description.substring(0, 40)}</p>
                  <p className="text-sm">Rs {product.price}</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded"
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
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
      </div>
    </Layout>
  );
};

export default SearchPage;
