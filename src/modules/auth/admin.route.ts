import { Response, Router } from "express";
import { authenticate, AuthRequest } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/admin/dashboard",
  authenticate,
  authorize("admin"),
  (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to Admin Dashboard",
      user: req.user,
    });
  },
);

export default router;
