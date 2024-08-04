const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  realtedProductController,
  productFilterController,
  productCountController,
  searchProductsController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} = require("../controllers/productController");
const router = express.Router();
const formidable = require("express-formidable");

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get products
router.get("/get-product", getProductController);

// get single products
router.get("/get-product/:slug", getSingleProductController);

// get single products photo
router.get("/product-photo/:pid", productPhotoController);

// delete products
router.delete("/delete-product/:pid", deleteProductController);

// product filter
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCountController);

// product list per page
// router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductsController);

// similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,

  formidable(),
  updateProductController
);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = router;
