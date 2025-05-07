import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  deletarAllTask,
  deleteTask,
  getTask,
  updateCompletedTask,
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getTask);
router.post("/", createTask);
router.delete("/all", deletarAllTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateCompletedTask);

export default router;
