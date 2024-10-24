import dbInstance from "../database/mysql.config.js";

const createTask = (taskInfo, callback) => {
  const { userId, title, description, dueDate, status, category, priority } = taskInfo;
  dbInstance.query(
    "INSERT INTO tasks (userId, title, description, dueDate, status, category, priority) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, title, description, dueDate, status, category, priority],
    callback
  );
};

const getTasksByUserId = (userId, callback) => {
  dbInstance.query("SELECT * FROM tasks WHERE userId =?", [userId], callback);
};

const updateTaskById = (taskInfo, callback) => {
  const { taskId, userId, title, description, dueDate, status, category, priority } =
    taskInfo;
  dbInstance.query(
    "UPDATE tasks SET title =?, description =?, dueDate =?, status =?, category =?, priority =? WHERE taskId =?",
    [title, description, dueDate, status, category, priority, taskId],
    callback
  );
};

const deleteTaskById = (taskInfo, callback) => {
  const { taskId } = taskInfo;
  console.log(taskId);
  dbInstance.query("DELETE FROM tasks WHERE taskId =?", [taskId], callback);
};

const changeStatusById = (taskInfo, callback) => {
  const { taskId, status } = taskInfo;
  console.log(taskId, status);
  dbInstance.query(
    "UPDATE tasks SET status = ? WHERE taskId =?",
    [status, taskId],
    callback
  );
};

export default {
  createTask,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
  changeStatusById,
};
