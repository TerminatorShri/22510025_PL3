import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Filter from "./components/Filter";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = (task) => {
    setTasks([...tasks, { text: task, completed: false }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border-2 border-gray-300 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">To-do List</h1>
      <AddTaskForm onAddTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onComplete={toggleTaskCompletion}
        onRemove={removeTask}
      />
    </div>
  );
}

export default App;
