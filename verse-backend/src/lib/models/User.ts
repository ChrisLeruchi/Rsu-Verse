import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  level: {
    type: String,
    enum: ["100L", "200L", "300L", "400L", "500L", "Alumni"],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    default: "Engineering",
  },
  name: {
    type: String,
    default: "Pending OCR Extraction",
  },
  matricNumber: {
    type: String,
    default: function () {
      return `TEMP-${Date.now()}`;
    },
  },
  receiptImageUrl: {
    type: String,
    default: null,
  }, // or file path
  isVerified: {
    type: Boolean,
    default: false,
  }, // set to true after OCR/admin approval
  role: {
    type: String,
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// hash password before saving user to database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);  

  // next();
})

const User = models.User || mongoose.model("User", userSchema);

export default User;
