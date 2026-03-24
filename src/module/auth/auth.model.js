import {required} from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is requird"],
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {type: String, select: false},
    refreshToken: {type : String , select : false},
    resetPasswordToken: {type : String , select : false},
    resetPasswordExpires: {type : Date , select : false},
  },
  {timestamps: true},
);

export default mongoose.model("User", userSchema);
