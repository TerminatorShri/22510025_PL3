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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        To-do List
      </h1>
      <AddTaskForm onAddTask={addTask} />

      <div className="flex mt-6 space-x-6">
        <div className="w-1/4">
          <Filter filter={filter} setFilter={setFilter} />
        </div>

        <div className="w-3/4">      
          <TaskList
            tasks={filteredTasks}
            onComplete={toggleTaskCompletion}
            onRemove={removeTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
