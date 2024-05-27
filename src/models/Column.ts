import { Schema, model } from "mongoose";

const columnSchema = new Schema({
  name: { type: String, required: true },
});

const Column = model("Column", columnSchema);

export default Column;
