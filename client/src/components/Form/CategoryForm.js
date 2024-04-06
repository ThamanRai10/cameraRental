import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="max-w-sm ml-[20%] mx-auto">
      <form onSubmit={handleSubmit} className="pr-5">
        <input
          type="text"
          id="text"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" w-[70%] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
