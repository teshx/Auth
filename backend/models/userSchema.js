import { types } from "mime-types";
import mongoose from "mongoose";

const userscema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    resetPassworedToken: String,
    resetPassworedExpiresAt: Date,
    verificationToken: String,
    verificationExpires: Date,
  },
  { timestamps: true }
);

export const user = mongoose.model("user", userscema);
