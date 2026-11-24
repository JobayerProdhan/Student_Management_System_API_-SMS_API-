import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayLoad {
  id: number;
  email: string;
  role: "admin" | "teacher" | "student";
}

export interface AuthRequest extends Request {
  user?: JwtPayLoad;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Get authorization header
    const auth_header = req.headers.authorization;

    if (!auth_header || !auth_header.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access denied.No token provided",
      });
    }

    // 2. Extract Token
    const token = auth_header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // 3. Get JWT token
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT SECRET  is missing ");
    }

    // 4. Verify token
    const decoded = jwt.verify(token, secret) as JwtPayLoad;

    // 5. Attach user information to request
    req.user = decoded;

    // 6. Continue to next middleware / controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expried token",
    });
  }
};
