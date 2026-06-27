import express from "express";
import User from "../lib/models/User.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
