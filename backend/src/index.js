import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import initializeDatabase from "./connection/db.connect.js";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Set up CORS options to allow all origins
const corsOptions = {
  origin: true, // Allows all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ["GET", "POST", "OPTIONS"], // Allow these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

initializeDatabase();

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running in port http://localhost:${PORT}`)
);
