import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);

export default router;
