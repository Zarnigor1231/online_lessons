import multer from 'multer';

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp4|flv|wmv|mov|avi)$/)) {
            return cb(new Error('Please upload a valid video file'));
        }
        cb(null, true);
    },
});