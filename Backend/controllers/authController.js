const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userSchema = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const orderSchema = require("../models/orderModel");

// Registeration
const registerController = async (req, res) => {
  try {
    const { name, password, email, phone, role, address, answer } = req.body;

    // validation
    if (!name || !email || !phone || !password || !address || !answer) {
      return res.status(400).send({ message: "Fields are required." });
    }

    //password
    if (password && password.length < 6) {
      return res.send({ error: "Passsword should be atleast 6 characters..." });
    }

    // check user
    const existingUser = await userSchema.findOne({ email });
    // existing user
    if (existingUser) {
      res.send({
        success: true,
        message: "Already Registered , Please Login",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    // save it
    const user = await new userSchema({
      name,
      phone,
      email,
      role,
      address,
      answer,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully...",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration.",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password...",
      });
    }
    // check user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential...",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password...",
      });
    }

    // token
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "1day",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login.",
      error,
    });
  }
};

// forgot Password controller
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    // validation
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "Fields are required." });
    }
    const user = await userSchema.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer...",
      });
    }
    const hashed = await hashPassword(newPassword);
    const newPass = await userSchema.findByIdAndUpdate(user._id, {
      password: hashed,
    });
    console.log("NewPassword:", newPass);
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userSchema.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword should be atleast 6 characters..." });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderSchema.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userSchema.find({ role: 0 }); // Query to fetch users with role = 0
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting users with role = 0",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId and role
    const user = await userSchema.findOne({ _id: userId, role: 0 });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the specified role",
      });
    }

    // Delete the user
    await userSchema.findByIdAndDelete(userId);

    // Send success response
    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUserId: userId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting user", error });
  }
};

module.exports = {
  registerController,
  orderStatusController,
  loginController,
  forgotPasswordController,
  getAllUsersController,
  updateProfileController,
  deleteUserController,
  getOrdersController,
  getAllOrdersController,
};
