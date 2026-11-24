import { Request, Response } from "express";
import { get_all_students, get_student_by_id } from "./student.service";

export const get_students = async (req: Request, res: Response) => {
  try {
    const students = await get_all_students();

    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.log("Get  students error: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const get_student = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await get_student_by_id(id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    console.log("Get student by id: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
