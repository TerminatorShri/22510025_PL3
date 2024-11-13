import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify";

const TaskForm = ({ setShowForm, isEditForm, setIsEditForm, editTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { setTasks } = useTasks();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      if (isEditForm) {
        const response = await axios.put(
          `/api/v1/tasks/${editTask.taskId}`,
          { ...data, userId: user.id, status: "pending" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === editTask.taskId ? { ...task, ...data } : task
            )
          );
          toast.success("Task updated successfully!");
        } else {
          toast.error("Failed to update task!");
        }
      } else {
        const response = await axios.post(
          "/api/v1/tasks",
          { ...data, status: "pending", userId: user.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            ...data,
            status: "pending",
            userId: user.id,
            taskId: response.data.data.insertId,
          },
        ]);
        toast.success("Task created successfully!");
      }

      reset();
      setShowForm(false);
      setIsEditForm(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(isEditForm ? "Error updating task!" : "Error creating task!");
    }
  };

  useEffect(() => {
    if (isEditForm && editTask) {
      setValue("title", editTask.title);
      setValue("description", editTask.description);
      setValue("priority", editTask.priority);
      setValue("category", editTask.category);
      setValue("dueDate", editTask.dueDate.split("T")[0]);
    }
  }, [isEditForm, editTask, setValue]);

  return (
    <div className="nunito-font fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 overlay">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">
          {isEditForm ? "Update Info" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="fredoka-font block text-gray-700 text-md mb-2"
            >
              Title:
            </label>
            <input
              id="title"
              className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              type="text"
              placeholder="Enter task title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="fredoka-font block text-gray-700 text-md mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              placeholder="Enter task description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Due Date Field */}
          <div>
            <label
              htmlFor="dueDate"
              className="fredoka-font block text-gray-700 text-md mb-2"
            >
              Due Date:
            </label>
            <input
              id="dueDate"
              type="date"
              className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              {...register("dueDate", { required: "Due date is required" })}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Priority Field */}
          <div>
            <label className="fredoka-font block text-gray-700 text-md mb-2">
              Priority:
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="high"
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                />
                High
              </label>
              <label>
                <input type="radio" value="medium" {...register("priority")} />
                Medium
              </label>
              <label>
                <input type="radio" value="low" {...register("priority")} />
                Low
              </label>
            </div>
            {errors.priority && (
              <p className="text-red-500 text-xs mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="fredoka-font block text-gray-700 text-md mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="hobby">Hobby</option>
              <option value="health">Health</option>
              <option value="study">Study</option>
              <option value="errands">Errands</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 fredoka-font">
            <button
              type="submit"
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
            >
              <span className="relative text-white">
                {isEditForm ? "Update Task" : "Save Task"}
              </span>
            </button>
            <button
              type="button"
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-md group ml-4"
              onClick={() => {
                setShowForm(false);
                setIsEditForm(false);
              }}
            >
              <span className="relative text-white">Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
