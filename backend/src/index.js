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

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173/", // Allow frontend domain
    methods: ["GET", "POST", "OPTIONS"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// Apply CORS middleware
app.use(cors(corsOptions));
initializeDatabase();

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running in port http://localhost:${PORT}`)
);
