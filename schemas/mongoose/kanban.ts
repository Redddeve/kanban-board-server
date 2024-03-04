import { Schema } from 'mongoose';

export const schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export const cardSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    title: {
      type: String,
      default: 'Task',
    },
    content: {
      type: String,
      default: 'Description',
    },
    position: {
      type: Number,
    },
  },
  { versionKey: false },
);

export const sectionSchema = new Schema(
  {
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    title: { type: String, required: true },
    cards: { type: Array },
  },
  schemaOptions,
);

export const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sections: { type: Array },
  },
  schemaOptions,
);
