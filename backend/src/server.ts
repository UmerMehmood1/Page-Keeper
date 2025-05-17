import express, { Router } from "express";
import cors from "cors";
import connectDB from "./db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { routes } from "./routes/routes";

dotenv.config();
const port = process.env.PORT;
const app = express();
console.log(process.env.CORS_ORIGIN);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Create a Router instance and pass it to the `routes` function
const router = Router();
routes(router); // Pass the Router instance to routes

app.use(router); // Register the router with the express app
app.get("/", (req, res) => {
  res.json({ message: "CORS is working properly" });
});
// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
export default app;
