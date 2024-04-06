import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/Layout/Layout";

const SearchPage = () => {
  const [values, setValues] = useSearch();

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {values?.results.map((p) => (
              <div
                className="border p-4 flex flex-col items-center"
                key={p._id}
              >
                <img
                  className="w-32 h-32 object-cover mb-4"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="text-center">
                  <h5 className="font-semibold">{p.name}</h5>
                  <p className="text-sm">{p.description.substring(0, 40)}</p>
                  <p className="text-sm">$ {p.price}</p>
                  <div className="flex gap-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-4 rounded">
                      See Details
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-sm text-white font-semibold py-2 px-4 rounded">
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
