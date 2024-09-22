function TaskItem({ task, onComplete, onRemove }) {
  return (
    <li className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onComplete}
        className="mr-3"
      />
      <span
        className={`flex-grow ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={onRemove}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
}

export default TaskItem;
