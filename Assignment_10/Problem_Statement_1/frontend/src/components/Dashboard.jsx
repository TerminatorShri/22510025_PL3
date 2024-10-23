import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskSorting from "./TaskSorting";
import TaskList from "./TaskList";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, setTasks, currTasks, filterTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [tasksInitialized, setTasksInitialized] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/tasks/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("In res", response.data.data);
        setTasks(response.data.data);
        // console.log("Fetch tasks", user.id);
      } catch (error) {
        console.log("Error fetching tasks: ", error);
        toast.error("Error fetching user tasks.. Try again later !!!");
      }
    };

    fetchTasks();
  }, [user.id]);

  useEffect(() => {
    if (tasks.length !== 0) {
      // console.log("In filter", tasks);
      filterTasks();
      // console.log("In filter curr", currTasks);
      setTasksInitialized(true);
    }
  }, [tasks]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setShowForm(false);
      setIsEditForm(false);
      setEditTask(null);
    }
  };

  const openEditForm = (task) => {
    setEditTask(task);
    setIsEditForm(true);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-4">
      <h1 className="rowdy-font text-2xl font-bold mb-4">
        Personal Task Manager
      </h1>
      {tasksInitialized && <TaskSorting />}
      {showForm && (
        <div
          onClick={handleOverlayClick}
          className="nunito-font fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 overlay"
        >
          <TaskForm
            setShowForm={setShowForm}
            setIsEditForm={setIsEditForm}
            isEditForm={isEditForm}
            editTask={editTask}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {tasksInitialized &&
          currTasks.map((task) => (
            <TaskList
              key={task.taskId}
              task={task}
              openEditForm={openEditForm}
            />
          ))}
      </div>
      {/* Sticky Add Task Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Task
      </button>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
