import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import taksRouter from "./routes/task.routes.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taksRouter);

export default app;
