import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onRemove }) {
  if (tasks.length === 0)
    return <p className="text-center mt-4">No tasks available.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onComplete={() => onComplete(index)}
          onRemove={() => onRemove(index)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
