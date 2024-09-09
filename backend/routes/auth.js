import express from "express";
import {
  login,
  forgotpassword,
  signup,
  logout,
  verifyEmail,
} from "../controler/auth.controler.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.get("/login", login);
router.post("/forgotpassword", forgotpassword);

router.post("/verify-email", verifyEmail);

export default router;
