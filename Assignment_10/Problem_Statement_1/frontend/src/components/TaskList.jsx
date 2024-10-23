import React from "react";
import axios from "axios";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify";

const TaskList = ({ task, openEditForm }) => {
  const { tasks, setTasks } = useTasks();

  const onDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `/api/v1/tasks/${taskId}`,
      { taskId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.taskId !== taskId)
      );
      toast.success("Task deleted successfully!");
    } else {
      toast.error("Failed to delete task!");
    }
  };

  const handleCheckboxChange = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(tasks);
      const task = tasks.find((task) => task.taskId === taskId);
      const newStatus = task.status === "pending" ? "completed" : "pending";

      const response = await axios.patch(
        `/api/v1/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        toast.error("Failed to update task status!");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("An error occurred while updating the task status.");
    }
  };

  const priorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-700";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="fredoka-font flex flex-col bg-white w-80 rounded-md border p-4">
      {/* Title and buttons */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>

        {/* Checkbox and buttons on the right */}
        <div className="flex items-center gap-2">
          <label className="flex flex-row items-center gap-2.5">
            <input
              type="checkbox"
              id={`taskCompleteBtn-${task.taskId}`}
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.taskId)}
              className="peer hidden"
            />
            <label
              className="flex items-center cursor-pointer"
              htmlFor={`taskCompleteBtn-${task.taskId}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 200 200"
                className="checkbox-svg w-6 h-6 mr-2"
              >
                <mask fill="white" id="path-1-inside-1">
                  <rect height="200" width="200"></rect>
                </mask>
                <rect
                  mask="url(#path-1-inside-1)"
                  strokeWidth="10"
                  className="checkbox-box fill-gray-200 stroke-[#3700ff]"
                  height="200"
                  width="200"
                ></rect>
                <path
                  strokeWidth="10"
                  d="M52 111.018L76.9867 136L149 64"
                  className="checkbox-tick stroke-[#3902ff]"
                ></path>
              </svg>
            </label>
          </label>

          <div
            className="text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
            onClick={() => openEditForm(task)}
          >
            <svg
              className="w-6 stroke-green-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <div
            className="text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
            onClick={() => onDelete(task.taskId)}
          >
            <svg
              className="w-6 stroke-red-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">{task.description}</p>

      {/* Due date, priority, and category */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <div className="flex gap-2">
          <p>Due Date:</p>
          <p>{task.dueDate.split("T")[0]}</p>
        </div>
        <p className={`${priorityColor()} text-white px-2 py-1 rounded`}>
          {task.priority.toUpperCase()}
        </p>
        <p>{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</p>
      </div>
    </div>
  );
};

export default TaskList;
