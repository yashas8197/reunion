import Task from "../models/task.model.js";
import { getTimeDifferenceInHours } from "../utils/helper.js";

// Add a new task
export const addTask = async (req, res) => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    const task = new Task({
      title,
      startTime,
      endTime,
      priority,
      status,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startTime, endTime, priority, status } = req.body;

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (startTime) updatedFields.startTime = startTime;
    if (endTime) updatedFields.endTime = endTime;
    if (priority) updatedFields.priority = priority;
    if (status) updatedFields.status = status;

    const task = await Task.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
};

export const statisticsData = async (req, res) => {
  try {
    // 1. Total count of tasks
    const totalTasks = await Task.countDocuments();

    // 2. Percent of completed and pending tasks
    const completedTasks = await Task.countDocuments({ status: "finished" });
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const completedPercentage =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pendingPercentage =
      totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

    // 3. Time lapsed and estimated balance time for pending tasks by priority
    const tasksByPriority = [1, 2, 3, 4, 5]; // Define your priority levels
    let timeLapsedByPriority = {};
    let balanceTimeByPriority = {};

    for (let priority of tasksByPriority) {
      const pendingTasksByPriority = await Task.find({
        priority,
        status: "pending",
      });

      let totalLapsedTime = 0;
      let totalEstimatedTime = 0;

      for (let task of pendingTasksByPriority) {
        const currentTime = new Date(); // Current time to calculate lapsed time and estimated time

        // Calculate time lapsed for pending task (current time - start time)
        const timeLapsed = getTimeDifferenceInHours(
          task.startTime,
          currentTime
        );

        // Calculate estimated time to finish (end time - current time) and prevent negative values
        const estimatedTime = Math.max(
          getTimeDifferenceInHours(currentTime, task.endTime),
          0
        );

        totalLapsedTime += timeLapsed;
        totalEstimatedTime += estimatedTime;
      }

      timeLapsedByPriority[priority] = totalLapsedTime;
      balanceTimeByPriority[priority] = totalEstimatedTime;
    }

    // 4. Overall average time for completion
    const completedTasksData = await Task.find({ status: "finished" });
    let totalCompletionTime = 0;
    let completedCount = 0;

    completedTasksData.forEach((task) => {
      // Ensure both startTime and endTime are valid dates
      if (task.startTime && task.endTime) {
        const completionTime = getTimeDifferenceInHours(
          task.startTime,
          task.endTime
        );
        if (completionTime >= 0) {
          totalCompletionTime += completionTime;
          completedCount++;
        }
      }
    });

    const avgCompletionTime = completedCount
      ? totalCompletionTime / completedCount
      : 0; // Avoid division by zero if no tasks are completed

    // Send the calculated statistics as a response
    res.json({
      totalTasks,
      completedPercentage,
      pendingPercentage,
      timeLapsedByPriority,
      balanceTimeByPriority,
      avgCompletionTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
