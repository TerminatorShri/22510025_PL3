import cloudinary from "../db/configCloudinary.js";

const uploadToCloudinary = async (buffer) => {
  try {
    const result = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "myimage",
            resource_type: "image",
          },
          (error, uploadResult) => {
            if (error) {
              console.log(error);
              console.log("error in cloudinary upload");
            }
            return resolve(uploadResult);
          }
        )
        .end(buffer);
    });
    return result.secure_url;
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
};

const deleteFileFromCloudinary = async (fileUrl) => {
  try {
    const publicId = fileUrl.split("/").slice(-1)[0].split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Delete Result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

export { uploadToCloudinary, deleteFileFromCloudinary };
