import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { get_student, get_students } from "./student.controller";

const router = Router();

router.get("/", authenticate, authorize("admin", "teacher"), get_students);

router.get("/:id", authenticate, authorize("admin", "teacher"), get_student);

export default router;
