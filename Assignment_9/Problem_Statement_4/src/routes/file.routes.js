import express from "express";
import authenticateAdmin from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import fileController from "../controllers/file.controller.js";

const {
  getAllFiles,
  downloadFileById,
  uploadFile,
  updateFileById,
  deleteFileById,
} = fileController;

const router = express.Router();

router.get("/getFiles", (req, res) => {
  getAllFiles(req, res);
});

router.get("/downloadFile/:fileId", (req, res) => {
  downloadFileById(req, res);
});

router.post(
  "/uploadFile",
  authenticateAdmin,
  upload.single("uploadFile"),
  (req, res) => {
    console.log(req.file);
    uploadFile(req, res);
  }
);

router.put(
  "/updateFile/:indx",
  authenticateAdmin,
  upload.single("uploadFile"),
  (req, res) => {
    updateFileById(req, res);
  }
);

router.delete("/deleteFile/:fileId", authenticateAdmin, (req, res) => {
  deleteFileById(req, res);
});

export default router;
