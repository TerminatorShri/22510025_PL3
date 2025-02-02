import taskModel from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const {
  createTask,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
  changeStatusById,
} = taskModel;

const createNewTask = (req, res) => {
  console.log("req");
  const { userId, title, description, dueDate, status, category, priority } =
    req.body;

  if (!userId || !title || !dueDate) {
    return res.status(400).json(new ApiError(400, "Missing required fields"));
  }

  const taskInfo = {
    userId,
    title,
    description,
    dueDate,
    status,
    category,
    priority,
  };

  createTask(taskInfo, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to create task", err));
    }
    console.log(result);
    return res
      .status(201)
      .json(new ApiResponse(201, result, "Task created successfully"));
  });
};

const getAllTasksForUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(new ApiError(400, "User ID is required"));
  }

  getTasksByUserId(userId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to fetch tasks", err));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Tasks fetched successfully"));
  });
};

const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { userId, title, description, dueDate, status, category, priority } =
    req.body;

  if (!taskId || !userId) {
    return res
      .status(400)
      .json(new ApiError(400, "Task ID and User ID are required"));
  }

  const taskInfo = {
    taskId,
    userId,
    title,
    description,
    dueDate,
    status,
    category,
    priority,
  };

  updateTaskById(taskInfo, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to update task", err));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Task updated successfully"));
  });
};

const deleteTask = (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res.status(400).json(new ApiError(400, "Task ID is required"));
  }

  deleteTaskById({ taskId }, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to delete task", err));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Task deleted successfully"));
  });
};

const changeTaskStatus = (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  console.log(req.params);
  console.log(req.body);

  if (!taskId) {
    return res.status(400).json(new ApiError(400, "Task ID is required"));
  }

  changeStatusById({ taskId, status }, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to complete task", err));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "Task not found or already completed"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Task status changed successfully"));
  });
};

export default {
  createNewTask,
  getAllTasksForUser,
  updateTask,
  deleteTask,
  changeTaskStatus,
};
