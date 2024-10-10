import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/configCloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "pdf"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

export const upload = multer({ storage });

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });
