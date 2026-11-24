import dotenv from "dotenv";
import express, { Request, Response } from "express";
import authRouter from "./modules/auth/auth.route.js";
import profileRoute from "./modules/auth/profile.route.js";
import adminRoute from "./modules/auth/admin.route.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", profileRoute);
app.use("/api/v1", adminRoute);

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
