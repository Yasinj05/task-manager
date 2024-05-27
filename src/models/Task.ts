import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  description: { type: String, required: true },
  owner: { type: String, required: true },
  columnId: { type: Schema.Types.ObjectId, ref: "Column", required: true },
  order: { type: Number, required: true },
});

const Task = model("Task", taskSchema);

export default Task;
