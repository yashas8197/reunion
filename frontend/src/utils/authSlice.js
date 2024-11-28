import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        userData
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authToken = localStorage.getItem("authToken"); // Retrieve the token

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        user,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the token here
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { name, email } = action.payload.createdUser;
        state.name = name;
        state.email = email;
        localStorage.setItem("authToken", action.payload.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.createdUser)
        );
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { name, email } = action.payload.user;
        state.name = name;
        state.email = email;
        localStorage.setItem("authToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error || action.payload.message;
      });
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.name = "";
        state.email = "";
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
