import streamifier from "streamifier";
import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        format: "png",

        transformation: [
          { effect: "background_removal" },
          {
            width: 800,
            height: 800,
            crop: "pad",
            background: "white"
          }
        ]
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};