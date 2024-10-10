import { File } from "../models/file.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFileFromCloudinary } from "../utils/Cloudinary.js";

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    return res
      .status(200)
      .json(new ApiResponse(200, files, "Files fetched successfully."));
  } catch (error) {
    console.error("Error fetching files:", error);
    return res.status(500).json(new ApiError(500, "Failed to fetch files."));
  }
};

const downloadFileById = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    if (!file) {
      throw new ApiError(404, "File not found");
    }

    const publicId = file.cloudinaryUrl.split("/").pop().split(".")[0];

    const downloadUrl = cloudinary.url(publicId, {
      resource_type: "auto",
      type: "download",
    });

    res.redirect(downloadUrl);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const fileData = {
      indx: req.body.indx,
      name: req.file.originalname,
      cloudinaryUrl: req.file.path,
    };

    const newFile = await File.create(fileData);
    res
      .status(201)
      .json(new ApiResponse(201, newFile, "File uploaded successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

const updateFileById = async (req, res) => {
  try {
    const indx = req.params.indx;
    const fileToUpdate = await File.findById(indx);

    if (!fileToUpdate) {
      throw new ApiError(404, "File not found");
    }

    const deleteResult = await deleteFileFromCloudinary(
      fileToUpdate.cloudinaryUrl
    );

    if (!deleteResult) {
      throw new ApiError(500, "Error deleting old file from Cloudinary");
    }

    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const updatedFile = await File.findByIdAndUpdate(
      indx,
      {
        name: req.file.originalname,
        cloudinaryUrl: req.file.path,
      },
      { new: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedFile, "File updated successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

const deleteFileById = async (req, res) => {
  try {
    const indx = req.params.fileId;
    const fileToDelete = await File.findById(indx);

    if (!fileToDelete) {
      throw new ApiError(404, "File not found");
    }

    const deleteResult = await deleteFileFromCloudinary(
      fileToDelete.cloudinaryUrl
    );

    if (!deleteResult) {
      throw new ApiError(500, "Error deleting file from Cloudinary");
    }

    await File.findByIdAndDelete(indx);

    res
      .status(200)
      .json(new ApiResponse(200, null, "File deleted successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

export default {
  getAllFiles,
  downloadFileById,
  uploadFile,
  updateFileById,
  deleteFileById,
};
