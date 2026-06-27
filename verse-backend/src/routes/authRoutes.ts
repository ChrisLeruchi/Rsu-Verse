import express from "express";
import User from "../lib/models/User.ts";
import jwt from "jsonwebtoken";
import "dotenv/config"

const router = express.Router();

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

router.post("/register", async (req, res) => {
  try {
    const { email, password, level, department, faculty, name, matricNumber } =
      req.body;

    if (
      !email ||
      !password ||
      !level ||
      !department ||
      !faculty ||
      !name ||
      !matricNumber
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create new user
    const newUser = new User({
      email,
      password,
      level,
      department,
      faculty,
      name,
      matricNumber,
      isAdmin: false, 
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        level: newUser.level,
        department: newUser.department,
        faculty: newUser.faculty,
        name: newUser.name,
        matricNumber: newUser.matricNumber,
      },
      message: `User: ${newUser.name} created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Please provide both email and password" });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        level: user.level,
        department: user.department,
        faculty: user.faculty,
        name: user.name,
        matricNumber: user.matricNumber,
      },
      message: `User: ${user.name} logged in successfully`,
    });
    
  } catch (error) {
    console.error(`Error in login route ${error}`);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
