import express from "express";
import { login, signin, signup, logout } from "../controler/auth.controler.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/signin", signin);
router.get("/login", login);
router.get("/logout", logout);

export default router;
