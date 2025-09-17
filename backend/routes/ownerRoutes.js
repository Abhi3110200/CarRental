import express from "express";
import { addCar, changeRoleToOwner, getOwnerCars, getDashboardData, deleteCar, toggleCarAvailability, updateImage } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload, { handleFileUpload } from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Using handleFileUpload which is more permissive and includes debugging
// The 'image' parameter here is just for reference, the actual field name will be logged
ownerRouter.post("/add-car", protect, ...handleFileUpload('image'), addCar);

ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);

ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-image",upload.single("image"), protect, updateImage);
export default ownerRouter;
