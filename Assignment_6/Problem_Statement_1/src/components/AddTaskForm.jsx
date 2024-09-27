import { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    onAddTask(task);
    setTask("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        className="border-2 border-gray-300 p-2 rounded-full w-full focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
      >
        Add Task
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default AddTaskForm;
