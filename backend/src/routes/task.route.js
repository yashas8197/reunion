import express from "express";
import {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  statisticsData,
} from "../contollers/task.controller.js";
import veriftJWT from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

// Route to get all tasks
taskRouter.get("/", veriftJWT, getAllTasks);

// Route to add a new task
taskRouter.post("/", addTask);

// Route to update an existing task
taskRouter.post("/:id", updateTask);

// Route to delete a task
taskRouter.delete("/:id", deleteTask);

taskRouter.get("/statistics", statisticsData);

export default taskRouter;
