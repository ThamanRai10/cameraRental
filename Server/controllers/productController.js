import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import { sendMail } from "../helpers/sendMail.js";

dotenv.config({ path: "./config.env" });


//Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_ID,
  privateKey: process.env.BRAINTREE_PRIVATE_ID,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    //Validation
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

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Create in Product",
    });
  }
};

//Get all product

export const getProductConntroller = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total_count: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Getting  Product",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single Product Fetch",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,

      message: "Error in Getting Single  Product",
      error,
    });
  }
};

//Get Photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Product Photo",
      error,
    });
  }
};

// Delete Product

export const deleteProductControlller = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//Update Product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    //Validation
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

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update in Product",
    });
  }
};

//Filter Function

export const filterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Filtering  Product",
      error,
    });
  }
};

//  Product Count
export const countController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: false,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Counting  Product",
    });
  }
};

//Product LIst page
export const listController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Page  Product",
      error,
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
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
      message: "Error in Search  Product",
      error,
    });
  }
};

//Similar Product
export const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error in Getting Similar   Product",
      error,
    });
  }
};

//Payment GateWay API
//Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    const { email, name, address } = req.user;

    let total = 0;
    cart.forEach((product) => {
      total += product.price;
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
            products: cart,
            payment: result,
            buyer: req.user._id,
          });

          await order.save();

          // Construct email content
          let emailContent = `📧 <strong>Dear ${name},<\strong>\n\n`;
          emailContent += "**Your Payment has been successfully completed.**\n\n";

          emailContent += "Your Order Details:\n";
          cart.forEach((product, index) => {
            emailContent += `${index + 1}. Product Name: ${product.name}\n`;
            emailContent += `   Description: ${product.description}\n`;
            emailContent += `   Price: Rs${product.price.toFixed(2)}\n\n`;
          });
          emailContent += `Total Price: Rs ${total.toFixed(2)}\n\n`;

          emailContent += "Shipping Address:\n";
          emailContent += `Name: ${name}\n`;
          // emailContent += `Address: ${address}\n`;
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
    res.status(500).send({ message: "Payment Unsuccessful" });
    console.log(error);
  }

  
};



