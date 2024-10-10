import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    indx: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const File = new mongoose.model("File", fileSchema);
