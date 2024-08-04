const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel.js");

// protected routes
const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Admin check
const isAdmin = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access...",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middleware....",
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
