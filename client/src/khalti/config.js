
import axios from "axios";
import myKey from "./khaltiKey";

let config = (productId,name) => ({
  // replace this key with yours
  publicKey: "test_public_key_f5a9eb63e53b4e46bad0739631b9027d",
  productIdentity: "jhbsdj",
  productName: "name",
  productUrl: "http://localhost:3000/",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };
      axios.defaults.withCredentials = true;
      axios
        .post("/verify_payment", {
          token: data.token,
          amount: data.amount,
          productId: productId,
        })
        .then(function (response) {
          console.log(response);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
});

export default config;