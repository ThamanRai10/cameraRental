import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Remove Item from  cart
  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Get Payment Token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);

      toast.success("Payment Successful.");
      setTimeout(() => {
        navigate("/dashboard/user/orders");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h1 className="text-center mb-3">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to Check out the items"
                  }`
                : "Your Cart is empty"}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 px-7">
            {cart?.map((p) => (
              <div key={p._id} className="flex mb-7  rounded-lg shadow-lg">
                <div className="w-40 h-40">
                  <img
                    className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between p-4">
                  <div>
                    <h1 className="text-lg font-bold">{p.name}</h1>
                    <p className="text-sm">{p.description.substring(0, 30)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Price: ${p.price}</h1>
                    <button
                      onClick={() => removeItem(p._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Remove
                    </button>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center col-span-1 p-4 ml-5 text-white rounded-lg bg-blue-500">
            <h1 className=" mt-2 text-2xl font-semibold"> Cart Summary </h1>
            <p className="font-semibold"> Total Payment Check Out </p>
            <hr />
            <h1 className="text-xl font-medium shadow-lg mt-5">
              {" "}
              Total:{totalPrice()}
            </h1>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h1> Current Address</h1>
                  <h1>{auth?.user?.address}</h1>
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div>
                {auth?.token ? (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Please Login to Check out{" "}
                  </button>
                )}
              </div>
            )}
            <div className="mt-4">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="bg-white hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing...." : "Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
