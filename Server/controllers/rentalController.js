import slugify from "slugify";
import rentalModel from "../models/rentalModel.js";
import fs from "fs";
import dotenv from "dotenv";
import { sendMail } from "../helpers/sendMail.js";

dotenv.config({ path: "./config.env" });

export const createRentalController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });

      case !description:
        return res.status(500).send({
          error: "Description is required",
        });

      case !price:
        return res.status(500).send({
          error: "Price is required",
        });

      case !category:
        return res.status(500).send({
          error: "Category is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "Quantity is required",
        });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and less than 1 MB",
        });
    }

    const rentals = new rentalModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      rentals.photo.data = fs.readFileSync(photo.path);
      rentals.photo.contentType = photo.type;
    }
    await rentals.save();
    res.status(201).send({
      success: true,
      message: "Rental Created Successfully",
      rentals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Create in Rental",
    });
  }
};

export const getRentalController = async (req, res) => {
  try {
    const rentals = await rentalModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total_count: rentals.length,
      message: "All rentals",
      rentals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Getting Rentals",
    });
  }
};

export const getSingleRentalController = async (req, res) => {
  try {
    const rental = await rentalModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single Rental Fetch",
      rental,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Single Rental",
      error,
    });
  }
};

export const rentalPhotoController = async (req, res) => {
  try {
    const rental = await rentalModel.findById(req.params.rid).select("photo");
    if (rental.photo.data) {
      res.set("Content-Type", rental.photo.contentType);
      res.status(200).send(rental.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Rental Photo",
      error,
    });
  }
};

export const deleteRentalController = async (req, res) => {
  try {
    await rentalModel.findByIdAndDelete(req.params.rid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Rental Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting rental",
      error,
    });
  }
};

export const updateRentalController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });

      case !description:
        return res.status(500).send({
          error: "Description is required",
        });

      case !price:
        return res.status(500).send({
          error: "Price is required",
        });

      case !category:
        return res.status(500).send({
          error: "Category is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "Quantity is required",
        });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and less than 1 MB",
        });
    }

    const rentals = await rentalModel.findByIdAndUpdate(
      req.params.rid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      rentals.photo.data = fs.readFileSync(photo.path);
      rentals.photo.contentType = photo.type;
    }
    await rentals.save();
    res.status(201).send({
      success: true,
      message: "Rental Updated Successfully",
      rentals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update in Rental",
    });
  }
};

//Filter Function for Rentals
export const filterRentalController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const rentals = await rentalModel.find(args);

    res.status(200).send({
      success: true,
      rentals,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Filtering Rentals",
      error,
    });
  }
};

//Count of Rentals
export const countRentalController = async (req, res) => {
  try {
    const total = await rentalModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: false,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Counting Rentals",
    });
  }
};

//List page for Rentals
export const listRentalController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const rentals = await rentalModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      rentals,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Paging Rentals",
      error,
    });
  }
};

export const searchRentalController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await rentalModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          {
            description: { $regex: keyword, $options: "i" },
          },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Searching Rentals",
      error,
    });
  }
};

//Similar Rentals
export const similarRentalController = async (req, res) => {
  try {
    const { rid, cid } = req.params;
    const rentals = await rentalModel
      .find({
        category: cid,
        _id: { $ne: rid },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      rentals,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error in Getting Similar Rentals",
      error,
    });
  }
};

//Payment Gateway API for Rentals
//Token
export const braintreeRentalTokenController = async (req, res) => {
  try {
    // Your implementation for generating rental payment gateway token with Braintree
  } catch (error) {
    console.log(error);
  }
};

//Rental Payment
export const braintreeRentalPaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    const { email, name, address } = req.user;

    let total = 0;
    cart.forEach((rental) => {
      total += rental.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          const order = new orderModel({
            rentals: cart,
            payment: result,
            buyer: req.user._id,
          });

          await order.save();

          // Construct email content
          let emailContent = `📧 <strong>Dear ${name},<\strong>\n\n`;
          emailContent += "**Your Payment has been successfully completed.**\n\n";

          emailContent += "Your Order Details:\n";
          cart.forEach((rental, index) => {
            emailContent += `${index + 1}. Rental Name: ${rental.name}\n`;
            emailContent += `   Description: ${rental.description}\n`;
            emailContent += `   Price: $${rental.price.toFixed(2)}\n\n`;
          });
          emailContent += `Total Price: $${total.toFixed(2)}\n\n`;

          emailContent += "Shipping Address:\n";
          emailContent += `Name: ${name}\n`;
          emailContent += `Address: ${address}\n`;
          emailContent += `Email: ${email}`;

          // Sending email
          sendMail({
            email: email,
            subject: "Payment Success",
            message: emailContent
          });

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Rental Payment Unsuccessful" });
    console.log(error);
  }
};
