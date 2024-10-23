import express from "express";
import userController from "../controllers/user.controller.js";

const { registerUser, loginUser } = userController;

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

export default router;
