import { json, Request, Response } from "express";
import { register_student } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      roll,
      department,
      semester,
      admission_year,
    } = req.body;

    // 1. Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !roll ||
      !department ||
      semester === undefined ||
      admission_year === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    // 2. Validate input types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof roll !== "string" ||
      typeof department !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input types",
      });
    }

    if (
      !Number.isInteger(semester) ||
      !Number.isInteger(admission_year) ||
      typeof semester !== "number" ||
      typeof admission_year !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Semester and admission year must be numbers",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 3. Call service
    const user = await register_student({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      roll: roll.trim(),
      department: department.trim(),
      semester,
      admission_year,
    });

    // 4. Send Response
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: user,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email or roll already exists",
      });
    }

    console.log("Registration error:", error);

    return res.status(500).json({
      succes: false,
      message: "Internal server error",
    });
  }
};
