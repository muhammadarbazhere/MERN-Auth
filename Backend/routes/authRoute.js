const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController,
  getAllOrdersController,
  getOrdersController,
  getAllUsersController,
  deleteUserController,
} = require("../controllers/authController.js");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

// REGISTER  using POST method
router.post("/register", registerController);

// LOGIN || POST Method
router.post("/Login", loginController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// forgot password || Post
router.post("/forgot-password", forgotPasswordController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//get all users
router.get("/users", requireSignIn, isAdmin, getAllUsersController);

//delete a users
router.delete("/user/:userId", requireSignIn, isAdmin, deleteUserController);

module.exports = router;
