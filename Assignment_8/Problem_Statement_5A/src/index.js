import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/DBConnect.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
