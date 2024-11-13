import dbInstance from "../database/mysql.config.js";

const findUserByUserName = (username, callback) => {
  dbInstance.query(
    "SELECT * FROM eventPlannerusers WHERE username =?",
    [username],
    callback
  );
};

const createUser = (user, callback) => {
  const { username, email, password, role } = user;
  dbInstance.query(
    "INSERT INTO eventPlannerusers (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, password, role || "user"],
    callback
  );
};

export default { findUserByUserName, createUser };
