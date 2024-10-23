import express from "express";
import taskController from "../controllers/task.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const {
  createNewTask,
  getAllTasksForUser,
  updateTask,
  deleteTask,
  changeTaskStatus,
} = taskController;

const router = express.Router();

router.post("/", createNewTask);

router.get("/:userId", getAllTasksForUser);

router.put("/:taskId", updateTask);

router.patch("/:taskId", authenticateToken, changeTaskStatus);

router.delete("/:taskId", deleteTask);

export default router;
