const fs = require("fs");
const productSchema = require("../models/productModel.js");
const categorySchema = require("../models/categoryModel.js");
const orderSchema = require("../models/orderModel.js");
const slugify = require("slugify");
const dotenv = require("dotenv");
const braintree = require("braintree");

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MARCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      company,
      color,
      quantity,
      shipping_fee,
      shipping,
    } = req.fields;
    const { photo } = req.files;

    // Basic validation
    if (
      !name ||
      !description ||
      !price ||
      !color ||
      !company ||
      !shipping_fee ||
      !category ||
      !quantity
    ) {
      return res.status(400).send({ error: "Missing required fields." });
    }

    // Check photo size
    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1mb." });
    }

    const products = new productSchema({ ...req.fields, slug: slugify(name) });

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
      message: "Error while creating product... ",
    });
  }
};

// get all products
const getProductController = async (req, res) => {
  try {
    const products = await productSchema
      .find({})
      .select("-photo")
      .limit(12)
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      TotalProduct: products.length,
      message: "Getting all products successfully...",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting all products...",
    });
  }
};

// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productSchema
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched...",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting single product",
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.pid)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting product photo...",
    });
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while deleting product...",
    });
  }
};

// update product
const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      company,
      color,
      category,
      quantity,
      shipping_fee,
      shipping,
    } = req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !color ||
      !company ||
      !shipping_fee ||
      !category ||
      !quantity
    ) {
      return res.status(400).send({ error: "Missing required fields." });
    }

    // Check photo size
    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1mb." });
    }

    const products = await productSchema.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!products) {
      return res.status(404).send({
        success: false,
        message: "Product not found.",
      });
    }

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product...",
      error: error.message,
    });
  }
};

// product filter
const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Apply category filter if there are checked categories
    if (checked.length > 0) {
      args.category = { $in: checked };
    }

    // Apply price filter if radio array has values
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productSchema.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products...",
      error,
    });
  }
};

// product count
const productCountController = async (req, res) => {
  try {
    const total = await productSchema.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while counting product...",
      error,
    });
  }
};

// Search products
const searchProductsController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productSchema
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while search a product...",
      error,
    });
  }
};

// similar products
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productSchema
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// product category
const productCategoryController = async (req, res) => {
  try {
    const category = await categorySchema.findOne({ slug: req.params.slug });
    const products = await productSchema
      .find({ category })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
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

//payment
const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    // cart.map((i) => {
    //   total += i.price;
    // });

    cart.forEach(async (item) => {
      total += item.price;
      // Update product quantity
      await productSchema.findByIdAndUpdate(item._id, {
        $inc: { quantity: -1 },
      });
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderSchema({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  searchProductsController,
  realtedProductController,
  productCategoryController,
  brainTreePaymentController,
  braintreeTokenController,
};
