import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  deletarAllTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.delete("/all", deletarAllTask);

export default router;
