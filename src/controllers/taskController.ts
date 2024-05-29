import { Request, Response } from "express";
import Task from "../models/Task";
import Column from "../models/Column";
import { sendCompletionNotification } from "../services/emailService";

// Utility function to handle errors
const handleError = (error: unknown, res: Response) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred.";
  res.status(500).json({ error: errorMessage });
};

// Controller to create a new task
export const createTask = async (req: Request, res: Response) => {
  const { description, owner, columnId, order } = req.body;

  try {
    const task = new Task({ description, owner, columnId, order });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to update an existing task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, owner, columnId, order } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { description, owner, columnId, order },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to reorder tasks within a column
export const reorderTasks = async (req: Request, res: Response) => {
  const { columnId, tasks } = req.body;

  try {
    const column = await Column.findById(columnId); // Validate column
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    // Validate each task
    for (const task of tasks) {
      const existingTask = await Task.findById(task.id);
      if (!existingTask) {
        return res
          .status(404)
          .json({ error: `Task with id ${task.id} not found` });
      }
      if (existingTask.columnId.toString() !== columnId) {
        return res.status(400).json({
          error: `Task with id ${task.id} does not belong to column ${columnId}`,
        });
      }
    }

    // Reorder tasks
    for (const task of tasks) {
      await Task.findByIdAndUpdate(task.id, { order: task.order, columnId });
    }

    res.status(200).json({ message: "Tasks reordered successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to bulk update tasks
export const bulkUpdateTasks = async (req: Request, res: Response) => {
  const { taskIds, columnId } = req.body;

  try {
    const column = await Column.findById(columnId); // Validate column
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    const tasks = await Task.find({ _id: { $in: taskIds } }); // Validate tasks
    if (tasks.length !== taskIds.length) {
      return res.status(404).json({ error: "One or more tasks not found" });
    }

    await Task.updateMany({ _id: { $in: taskIds } }, { columnId }); // Bulk update tasks

    res.status(200).json({ message: "Tasks updated successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to mark a task as completed
export const markTaskAsCompleted = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status: "Completed" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await sendCompletionNotification(task.owner, task.description); // Notify task owner
    res.status(200).json(task);
  } catch (error) {
    handleError(error, res);
  }
};
