import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currTasks, setCurrTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("none");

  const filterTasks = () => {
    let filteredTasks = tasks;

    if (showCompleted) {
      filteredTasks = filteredTasks.filter((task) => task.status === "completed");
    } else {
      filteredTasks = filteredTasks.filter((task) => task.status === "pending");
    }

    if (selectedPriority !== "none") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === selectedPriority
      );
    }

    if (selectedCategory !== "none") {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === selectedCategory
      );
    }

    setCurrTasks(filteredTasks);
  };

  // const addTask = (task) => {
  //   setTasks((prevTasks) => [...prevTasks, task]);
  // };

  // const updateTask = (id, updatedTask) => {
  //   // console.log("inside");
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === id ? { ...task, ...updatedTask } : task
  //     )
  //   );
  //   // console.log("complete");
  // };

  // const deleteTask = (id) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  // };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        currTasks,
        setCurrTasks,
        filterTasks,
        // addTask,
        // updateTask,
        // deleteTask,
        showCompleted,
        setShowCompleted,
        selectedPriority,
        setSelectedPriority,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
