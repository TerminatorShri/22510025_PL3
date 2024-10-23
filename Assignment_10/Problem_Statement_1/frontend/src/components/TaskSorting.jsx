import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskSorting = () => {
  const {
    showCompleted,
    setShowCompleted,
    selectedPriority,
    setSelectedPriority,
    selectedCategory,
    setSelectedCategory,
    filterTasks,
  } = useTasks();

  useEffect(() => {
    // console.log("In sort");
    filterTasks();
  }, [showCompleted, selectedPriority, selectedCategory]);

  return (
    <div className="flex justify-center space-x-4">
      <div className="w-60">
        <label className="fredoka-font block text-gray-700 text-md mb-2">
          Status:
        </label>
        <select
          onChange={(e) => {
            setShowCompleted(e.target.value === "completed");
          }}
          className="fredoka-font text-sm text-black custom-input w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="w-60">
        <label className="fredoka-font block text-gray-700 text-md mb-2">
          Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="fredoka-font text-sm text-black custom-input w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        >
          <option value="none">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="hobby">Hobby</option>
          <option value="health">Health</option>
          <option value="study">Study</option>
          <option value="errands">Errands</option>
        </select>
      </div>

      <div className="w-60">
        <label className="fredoka-font block text-gray-700 text-md mb-2">
          Priority:
        </label>
        <select
          value={selectedPriority}
          onChange={(e) => {
            setSelectedPriority(e.target.value);
          }}
          className="fredoka-font text-sm text-black custom-input w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        >
          <option value="none">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default TaskSorting;
