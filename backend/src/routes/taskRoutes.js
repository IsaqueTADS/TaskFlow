import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createTask, getTask } from "../controllers/taskController";

const router = express.Router();
router.use(authenticate);

router.get("/", getTask);
router.post("/", createTask);

export default router;
