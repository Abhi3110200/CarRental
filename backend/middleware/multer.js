import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log('Processing file:', file);
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Create a more permissive multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    fields: 10, // Allow multiple text fields
    files: 1,   // Allow only one file
  },
});

// Middleware to log form data
const logFormData = (req, res, next) => {
  console.log('Form fields:', req.body);
  console.log('Files:', req.files);
  console.log('File:', req.file);
  next();
};

// Export a more flexible file upload handler
export const handleFileUpload = (fieldName) => {
  return [
    (req, res, next) => {
      console.log('Incoming request headers:', req.headers['content-type']);
      next();
    },
    upload.any(), // Accept any files
    logFormData,
    (req, res, next) => {
      // If we got here, the file was uploaded successfully
      if (req.file) {
        // If using single file upload
        req.uploadedFile = req.file;
      } else if (req.files && req.files.length > 0) {
        // If using multiple files or any()
        req.uploadedFile = req.files[0];
      }
      next();
    }
  ];
};

export default upload;