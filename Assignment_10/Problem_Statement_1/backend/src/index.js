import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./database/mysql.config.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3000;

dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

process.on("SIGINT", () => {
  dbConnection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});
