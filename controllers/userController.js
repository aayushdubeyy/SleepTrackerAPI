const mongoose = require("mongoose");
const User = require("../models/User");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string().optional(),
      email: z.string().email(),
      password: z.string().min(6),
    });
    const resp = schema.safeParse({ firstName, lastName, email, password });
    if (!resp.success) {
      return res.status(400).json({
        success: false,
        error: resp.error.errors,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const tokenPayload = {
      userId: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    return res.json({
      success: true,
      message: "User created successfully",
      newUser: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const resp = schema.safeParse({ email, password });
    if (!resp.success) {
      return res.status(400).json({
        success: false,
        error: resp.error.errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    return res.json({
      success: true,
      message: "Sign-in successful",
      token,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
