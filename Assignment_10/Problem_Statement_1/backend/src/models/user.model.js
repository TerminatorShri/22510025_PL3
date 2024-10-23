import dbInstance from "../database/mysql.config.js";

const findUserByUserName = (username, callback) => {
  dbInstance.query(
    "SELECT * FROM taskManagerUsers WHERE username =?",
    [username],
    callback
  );
};

const createNewUser = (user, callback) => {
  const { username, email, password } = user;
  dbInstance.query(
    "INSERT INTO taskManagerUsers (username, email, password) VALUES (?,?,?)",
    [username, email, password],
    callback
  );
};

export default { findUserByUserName, createNewUser };
