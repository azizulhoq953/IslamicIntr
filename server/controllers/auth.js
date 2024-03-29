import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      avatar: {
        public_id: "This is a sample Id",
        url: req.file.originalname,
      },
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10),
      impressions: Math.floor(Math.random() * 10),
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      savedUser,
      message: "User Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Something went wrong while registering User",
    });
  }
};

// Logging In
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    delete user.password;

    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Logged In Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Something Went wrong while logging",
    });
  }
};
