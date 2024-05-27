import { Router } from "express";
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController";

const router = Router();

router.post("/columns", createColumn);
router.put("/columns/:id", updateColumn);
router.delete("/columns/:id", deleteColumn);

export default router;
