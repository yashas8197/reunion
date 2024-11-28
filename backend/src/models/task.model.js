import mongoose from "mongoose";

// Define the schema for the Task model
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "finished"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
