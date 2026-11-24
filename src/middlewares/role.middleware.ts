import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";

type UserRole = "admin" | "teacher" | "student";

export function authorize(...allowedRoles: UserRole[]) {
  function authorizationMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    // 1. Check authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication  required",
      });
    }

    //2. check user role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permission",
      });
    }

    //3. Continue to next middleware
    next();
  }

  return authorizationMiddleware;
}
