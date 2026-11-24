import { Response, Router } from "express";
import { authenticate, AuthRequest } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/profile", authenticate, (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Profile accessed successfully",
    user: req.user,
  });
});

export default router;
