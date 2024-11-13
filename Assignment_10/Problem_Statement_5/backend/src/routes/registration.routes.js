import express from "express";
import registrationController from "../controllers/registration.controller.js";

const { registerForEvent, getUserRegistrations } = registrationController;

const router = express.Router();

const logger = (req, res, next) => {
  console.log("Request received: ", req.params);
  next();
};

router.post("/register/:eventId/:userId", registerForEvent);

router.get("/registered/:userId", logger, getUserRegistrations);

export default router;
