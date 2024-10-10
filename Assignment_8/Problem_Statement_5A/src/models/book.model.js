import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    indx: { type: Number, required: true },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
