import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setValues({ ...values, keyword: value });

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/search/${value}`);
      setLoading(false);
      setSuggestions(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelection = (product) => {
    setValues({ ...values, keyword: product.name });
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="">
      <form className="flex gap-2" role="search" onSubmit={handleSubmit}>
        <input
          value={values.keyword}
          onChange={handleInputChange}
          type="text"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Product"
        />
        <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded">
          Search
        </button>
      </form>
      {loading }
      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white w-64 border rounded mt-1 ">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer flex items-center px-2 py-1 hover:bg-gray-400"
              onClick={() => handleSelection(product)}
            >
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-8 h-8 mr-2"
              />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
