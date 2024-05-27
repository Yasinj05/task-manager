import { Request, Response } from "express";
import Column from "../models/Column";

// Utility function to handle errors
const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred." });
  }
};

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const column = new Column({ name });
    await column.save();
    res.status(201).json(column);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const column = await Column.findByIdAndUpdate(id, { name }, { new: true });
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }
    res.status(200).json(column);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const column = await Column.findByIdAndDelete(id);
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }
    res.status(200).send({ message: "Column deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};
