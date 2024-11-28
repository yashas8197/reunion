// utils/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks for asynchronous actions (e.g., fetching tasks)
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("http://localhost:3000/tasks");
  const data = await response.json();
  return data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  console.log(data.task);
  return data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return id;
  }
  throw new Error("Failed to delete task");
});

export const fetchStatistics = createAsyncThunk(
  "tasks/fetchStatistics",
  async () => {
    const response = await fetch("http://localhost:3000/tasks/statistics");
    const data = await response.json();
    return data;
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
        console.log(state.tasks);
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
