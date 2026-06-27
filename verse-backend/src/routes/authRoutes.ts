import express from "express";
import User from "../lib/models/User.ts";

const router = express.Router();

router.post("/register", async (req,  res) => {
  const { email, password, level, department, faculty, name, matricNumber } = req.body;

  if(!email || !password || !level || !department || !faculty || !name || !matricNumber) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  if(password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  if(name.length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters long" });
  }

  //check if user already exists
  const existingUser = await User.findOne({ email })
  if(existingUser) {
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
    matricNumber
  });

  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password" });
  }
});

export default router;
