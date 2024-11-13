import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

const { registerUser, loginUser } = userController;

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
