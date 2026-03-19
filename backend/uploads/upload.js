import multer from 'multer';
const storage = multer.memoryStorage();
const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png"
];
const upload = multer(
    {
        storage,
        limits: { fileSize: 2 * 1024 * 1024 }, // file size
        fileFilter: (req, file, cb) => {
            // Only allow JPEG and PNG files
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                // Reject the file or pass an error
                cb(new Error('Invalid file type! Only JPEG, JPG AND PNG are allowed.'), false);
            }
        }
    }
);

export default upload;