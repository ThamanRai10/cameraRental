import express from "express";
import { isAdmin, requireSignIn } from "../midllewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  countController,
  createProductController,
  deleteProductControlller,
  filterController,
  getProductConntroller,
  getSingleProductController,
  listController,
  productPhotoController,
  searchController,
  similarProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Route Post
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Get Products
router.get("/get-product", getProductConntroller);

//Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/del-product/:pid", deleteProductControlller);

//Update
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Filter Product
router.post("/product-filters", filterController);

//Count Product
router.get("/product-count", countController);

//List Product
router.get("/product-list/:page", listController);

//Search Product
router.get("/search/:keyword", searchController);

//Similar Product API
router.get("/related-product/:pid/:cid", similarProductController);

//Payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//Payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
