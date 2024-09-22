import { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    onAddTask(task);
    setTask('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a task" 
        className="border-2 p-2 rounded-md w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Add Task
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default AddTaskForm;

