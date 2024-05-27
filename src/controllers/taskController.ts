import { Request, Response } from "express";
import Task from "../models/Task";
import { sendCompletionNotification } from "../services/emailService";

// Utility function to handle errors
const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred." });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description, owner, columnId, order } = req.body;
    const task = new Task({ description, owner, columnId, order });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, owner, columnId, order } = req.body;
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

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

export const reorderTasks = async (req: Request, res: Response) => {
  try {
    const { columnId, tasks } = req.body;

    for (const task of tasks) {
      await Task.findByIdAndUpdate(task.id, { order: task.order, columnId });
    }

    res.status(200).json({ message: "Tasks reordered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bulkUpdateTasks = async (req: Request, res: Response) => {
  try {
    const { taskIds, columnId } = req.body;

    await Task.updateMany({ _id: { $in: taskIds } }, { columnId });

    res.status(200).json({ message: "Tasks updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markTaskAsCompleted = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id,
      { status: "Completed" },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await sendCompletionNotification(task.owner, task.description);
    res.status(200).json(task);
  } catch (error) {
    handleError(error, res);
  }
};
