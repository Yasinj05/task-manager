import { Request, Response } from "express";
import Column from "../models/Column";

// Utility function to handle errors
const handleError = (error: unknown, res: Response) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred.";
  res.status(500).json({ error: errorMessage });
};

// Controller to create a new column
export const createColumn = async (req: Request, res: Response) => {
  const { name } = req.body;

  // Validate request body
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // Create and save new column
    const column = new Column({ name });
    await column.save();
    res.status(201).json(column);
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to update an existing column
export const updateColumn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate request body
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // Find and update the column
    const column = await Column.findByIdAndUpdate(id, { name }, { new: true });

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    res.status(200).json(column);
  } catch (error) {
    handleError(error, res);
  }
};

// Controller to delete a column
export const deleteColumn = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find and delete the column
    const column = await Column.findByIdAndDelete(id);

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    res.status(200).json({ message: "Column deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};
