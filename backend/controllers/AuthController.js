const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exist", success: false });
    }
    const userModel = new User({ name, email, password, role });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "internal problem", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errMsg = "Auth failed email or password is wrong ";
    if (!user) {
      return res.status(403).json({ message: errMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errMsg, success: false });
    }
    const jwtToken = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res
      .cookie("token", jwtToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Recommended for security
        secure: false,
      })
      .cookie("role", user.role,{
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Recommended for security
        secure: false,
      })
      .cookie("loggedinuser", user.name, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Recommended for security
        secure: false,
      })
      .status(201)
      .json({
        name: user.name,
        jwtToken,
        message: "successfully login",
        success: true,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal problem", success: false });
  }
};
module.exports = { signup, login };
