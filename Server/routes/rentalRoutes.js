import express from "express";
import { isAdmin, requireSignIn } from "../midllewares/authMiddleware.js";
import {
  braintreeRentalPaymentController,
  braintreeRentalTokenController,
  countController,
  createRentalController,
  deleteRentalControlller,
  filterController,
  getRentalConntroller,
  getSingleRentalController,
  listController,
  rentalPhotoController,
  searchController,
  similarRentalController,
  updateRentalController,
} from "../controllers/rentalController.js";
import formidable from "express-formidable";

const router = express.Router();

//Route Post
router.post(
  "/create-rental",
  requireSignIn,
  isAdmin,
  formidable(),
  createRentalController
);

//Get Rentals
router.get("/get-rental", getRentalConntroller);

//Single Rental
router.get("/get-rental/:slug", getSingleRentalController);

//Get Photo
router.get("/rental-photo/:rid", rentalPhotoController);

//Delete Rental
router.delete("/del-rental/:rid", deleteRentalControlller);

//Update
router.put(
  "/update-rental/:rid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateRentalController
);

//Filter Rental
router.post("/rental-filters", filterController);

//Count Rental
router.get("/rental-count", countController);

//List Rental
router.get("/rental-list/:page", listController);

//Search Rental
router.get("/search/:keyword", searchController);

//Similar Rental API
router.get("/related-rental/:rid/:cid", similarRentalController);

//Payment routes
//token
router.get("/braintree/rental-token", braintreeRentalTokenController);

//Payment
router.post("/braintree/rental-payment", requireSignIn, braintreeRentalPaymentController);

export default router;
