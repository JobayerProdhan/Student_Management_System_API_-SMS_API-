import { Request, Response } from "express";
import { get_all_students } from "./student.service";

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
