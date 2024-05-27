import { Router } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
  bulkUpdateTasks,
  markTaskAsCompleted,
} from "../controllers/taskController";

const router = Router();

router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/reorder", reorderTasks);
router.put("/tasks/bulk-update", bulkUpdateTasks);
router.put("/tasks/:id/completed", markTaskAsCompleted);

export default router;
