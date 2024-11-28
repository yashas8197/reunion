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

const allowedOrigins = [
  "http://localhost:5173", // Development (local)
  "https://reunion-6dyg.vercel.app/", // Production (Vercel)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

initializeDatabase();

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running in port http://localhost:${PORT}`)
);
