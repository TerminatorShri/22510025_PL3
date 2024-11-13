import express from "express";
import eventController from "../controllers/event.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const {
  createNewEvent,
  fetchAllEvents,
  getEventsByUser,
  updateEventById,
  deleteEventById,
  getEventsNotRegistered,
} = eventController;

const router = express.Router();

const logger = (req, res, next) => {
  console.log("Request received: ", req.body);
  next();
};

router.post("/", logger, upload.single("photo"), (req, res) => {
  createNewEvent(req, res);
});

router.get("/", fetchAllEvents);

router.get("/user/:userId", logger, getEventsByUser);

router.put("/:id", upload.single("photo"), updateEventById);

router.delete("/:id", logger, deleteEventById);

router.get("/not-registered", getEventsNotRegistered);

export default router;
