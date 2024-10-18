import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFileFromCloudinary } from "../utils/Cloudinary.js";
import db from "../db/DBConnect.js";

const getAllFiles = async (req, res) => {
  try {
    const [files] = await db.promise().query("SELECT * FROM Files");
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
    const [rows] = await db
      .promise()
      .query("SELECT * FROM Files WHERE indx = ?", [fileId]);
    const file = rows[0];

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

    const result = await db
      .promise()
      .query(
        "INSERT INTO Files (indx, name, cloudinary_url) VALUES (?, ?, ?)",
        [fileData.indx, fileData.name, fileData.cloudinaryUrl]
      );

    const newFile = { ...fileData, id: result[0].insertId };

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
    const [rows] = await db
      .promise()
      .query("SELECT * FROM Files WHERE indx = ?", [indx]);
    const fileToUpdate = rows[0];

    if (!fileToUpdate) {
      throw new ApiError(404, "File not found");
    }

    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    await db
      .promise()
      .query("UPDATE Files SET name = ?, cloudinary_url = ? WHERE indx = ?", [
        req.file.originalname,
        req.file.path,
        indx,
      ]);

    const updatedFile = {
      ...fileToUpdate,
      name: req.file.originalname,
      cloudinaryUrl: req.file.path,
    };

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
    const [rows] = await db
      .promise()
      .query("SELECT * FROM Files WHERE indx = ?", [indx]);
    const fileToDelete = rows[0];

    if (!fileToDelete) {
      throw new ApiError(404, "File not found");
    }

    await db.promise().query("DELETE FROM Files WHERE indx = ?", [indx]);

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
