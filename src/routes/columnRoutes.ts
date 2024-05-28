import { Router } from "express";
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Column:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the column
 *         name:
 *           type: string
 *           description: The column name
 *       example:
 *         id: 60c72b2f9b1e8a001c8e4c61
 *         name: "New Column Name"
 */

/**
 * @swagger
 * tags:
 *   name: Columns
 *   description: Columns management
 */

/**
 * @swagger
 * /columns:
 *   post:
 *     summary: Create a new column
 *     tags: [Columns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "New Column"
 *     responses:
 *       201:
 *         description: The column was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 */
router.post("/columns", createColumn);

/**
 * @swagger
 * /columns/{id}:
 *   put:
 *     summary: Update a column
 *     tags: [Columns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The column id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Updated Column Name"
 *     responses:
 *       200:
 *         description: The column was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 *       404:
 *         description: The column was not found
 *       500:
 *         description: Some error happened
 */
router.put("/columns/:id", updateColumn);

/**
 * @swagger
 * /columns/{id}:
 *   delete:
 *     summary: Remove the column
 *     tags: [Columns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The column id
 *     responses:
 *       200:
 *         description: The column was deleted
 *       404:
 *         description: The column was not found
 */
router.delete("/columns/:id", deleteColumn);

export default router;
