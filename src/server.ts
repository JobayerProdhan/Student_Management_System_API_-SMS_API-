import dotenv from "dotenv";
import express, { Request, Response } from "express";
import authRouter from "./modules/auth/auth.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRouter);

// Home routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Student Management System API",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
