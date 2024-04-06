import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis
            leo elit, nec pulvinar elit cursus at. Sed imperdiet enim a sapien
            efficitur, vitae pharetra arcu eleifend. Nunc nec feugiat odio, at
            luctus metus. Vivamus pulvinar erat in lacus volutpat tincidunt.
            Integer id nibh bibendum, congue justo ut, eleifend ipsum. Morbi
            viverra efficitur turpis in luctus.
          </p>
          <p className="mb-4">
            Vestibulum malesuada nulla et interdum interdum. Nullam consectetur,
            arcu ac pellentesque hendrerit, velit tellus scelerisque lacus, sit
            amet commodo ipsum nisi eget lorem. Aliquam nec pretium neque. Proin
            viverra efficitur augue eget consequat. Sed varius eleifend dui eget
            fermentum. Nunc vitae pulvinar ligula. In in ante vel nunc efficitur
            fringilla.
          </p>
          <p className="mb-4">
            Donec nec lacus eget metus congue ullamcorper. Morbi ac enim et ex
            pharetra egestas vitae et velit. Ut non interdum purus, id cursus
            quam. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Ut ut ante hendrerit, vestibulum
            lorem eget, finibus lorem. Duis dignissim dignissim ante, a dapibus
            enim pellentesque quis. Praesent at eleifend metus.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
