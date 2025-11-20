import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // import schema

const router = express.Router();

// REGISTER USER
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user in DB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
