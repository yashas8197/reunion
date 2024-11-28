// utils/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("https://reunion-wine.vercel.app/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await axios.post(
      "https://reunion-wine.vercel.app/tasks",
      task,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }) => {
    try {
      const response = await axios.post(
        `https://reunion-wine.vercel.app/tasks/${id}`,
        updatedTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    await axios.delete(`https://reunion-wine.vercel.app/tasks/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message); // Handle error
  }
});

export const fetchStatistics = createAsyncThunk(
  "tasks/fetchStatistics",
  async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "https://reunion-wine.vercel.app/tasks/statistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

// Create the slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: "idle",
    error: null,
    editTask: null,
    statistics: null,
  },
  reducers: {
    setEditTask: (state, action) => {
      state.editTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(action.payload);
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setEditTask } = taskSlice.actions;

export default taskSlice.reducer;
