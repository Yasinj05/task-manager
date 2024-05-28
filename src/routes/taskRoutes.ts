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

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - description
 *         - owner
 *         - columnId
 *         - order
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         description:
 *           type: string
 *           description: The task description
 *         owner:
 *           type: string
 *           description: The owner of the task
 *         columnId:
 *           type: string
 *           description: The id of the column the task belongs to
 *         order:
 *           type: number
 *           description: The order of the task within the column
 *       example:
 *         id: 60c72b2f9b1e8a001c8e4c62
 *         description: Complete the project documentation
 *         owner: user@example.com
 *         columnId: 60c72b2f9b1e8a001c8e4c61
 *         order: 1
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tasks management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               owner:
 *                 type: string
 *               columnId:
 *                 type: string
 *               order:
 *                 type: number
 *             example:
 *               description: "New task description"
 *               owner: "user@example.com"
 *               columnId: "60c72b2f9b1e8a001c8e4c61"
 *               order: 1
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               owner:
 *                 type: string
 *               columnId:
 *                 type: string
 *               order:
 *                 type: number
 *             example:
 *               description: "Updated task description"
 *               owner: "updated_user@example.com"
 *               columnId: "60c72b2f9b1e8a001c8e4c61"
 *               order: 2
 *     responses:
 *       200:
 *         description: The task was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 *       500:
 *         description: Some error happened
 */
router.put("/tasks/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove the task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 */
router.delete("/tasks/:id", deleteTask);

/**
 * @swagger
 * /tasks/reorder:
 *   patch:
 *     summary: Reorder tasks
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columnId:
 *                 type: string
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     order:
 *                       type: number
 *             example:
 *               columnId: "60c72b2f9b1e8a001c8e4c61"
 *               tasks:
 *                 - id: "60c72b2f9b1e8a001c8e4c63"
 *                   order: 1
 *                 - id: "60c72b2f9b1e8a001c8e4c64"
 *                   order: 2
 *     responses:
 *       200:
 *         description: Tasks reordered successfully
 *       500:
 *         description: Some error happened
 */
router.patch("/tasks/reorder", reorderTasks);

/**
 * @swagger
 * /tasks/bulk-update:
 *   patch:
 *     summary: Bulk update tasks
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               columnId:
 *                 type: string
 *             example:
 *               taskIds:
 *                 - "60c72b2f9b1e8a001c8e4c63"
 *                 - "60c72b2f9b1e8a001c8e4c64"
 *               columnId: "60c72b2f9b1e8a001c8e4c61"
 *     responses:
 *       200:
 *         description: Tasks updated successfully
 *       500:
 *         description: Some error happened
 */
router.patch("/tasks/bulk-update", bulkUpdateTasks);

/**
 * @swagger
 * /tasks/{id}/completed:
 *   put:
 *     summary: Mark task as completed
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task marked as completed
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some error happened
 */
router.put("/tasks/:id/completed", markTaskAsCompleted);

export default router;
