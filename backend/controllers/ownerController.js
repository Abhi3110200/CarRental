import imagekit from "../config/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

export const changeRoleToOwner = async(req,res)=>{
    try {
        const {_id}=req.body;
        await User.findByIdAndUpdate(_id,{role:"owner"});
        res.json({success: true, message: "Now you can list your cars" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}

//api to list car

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.uploadedFile || req.file;
        
        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Log the incoming request for debugging
        console.log('Request body:', req.body);
        console.log('Uploaded file:', imageFile);

        // Try to parse car data from form data or use the request body
        let car;
        try {
            car = req.body.carData ? JSON.parse(req.body.carData) : req.body;
        } catch (error) {
            console.error('Error parsing car data:', error);
            return res.status(400).json({ success: false, message: 'Invalid car data format' });
        }
        
        // Upload to ImageKit
        const response = await imagekit.upload({
            file: imageFile.buffer || imageFile,
            fileName: imageFile.originalname || `car-${Date.now()}.jpg`,
            folder: "/cars", 
        })
        console.log(response);

        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {width:'1280'},
                {quality:'auto'},
                {format:'webp'}
            ]
        })
        console.log(optimizedImageUrl);

        const image = optimizedImageUrl;

        await Car.create({...car,owner:_id,image});
        res.json({success: true, message: "Car added successfully" });        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}

export const getOwnerCars = async(req,res)=>{
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

//Api to toggle car availability

export const toggleCarAvailability = async(req,res)=>{
    try {
        const { _id } = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);
      
        if(car.owner.toString() !== _id.toString()){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        car.isAvailable = !car.isAvailable;
        await car.save();
        res.json({ success: true, message: "Car availability toggled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


//api to delete car

export const deleteCar = async(req,res)=>{
    try {
        const { _id } = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if(car.owner.toString() !== _id.toString()){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();
        res.json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

//api to get dashboard data
export const getDashboardData = async(req,res)=>{
    try {
        const { _id,role } = req.user;
        if(role !== "owner"){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate("car").sort({createdAt:-1});

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" }).sort({createdAt:-1});
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" }).sort({createdAt:-1});

        const monthlyRevenue = bookings.slice().filter(booking=>booking.status === "confirmed").reduce((acc,booking)=>acc+booking.price,0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

//api to update user image 
export const updateImage = async(req,res)=>{
    try {
        const { _id } = req.user;
        const imageFile = req.uploadedFile || req.file;
        
        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Log the incoming request for debugging
        console.log('Request body:', req.body);
        console.log('Uploaded file:', imageFile);

        const response = await imagekit.upload({
            file: imageFile.buffer || imageFile,
            fileName: imageFile.originalname || `user-${Date.now()}.jpg`,
            folder: "/user", 
        })
        console.log(response);

        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {width:'400'},
                {quality:'auto'},
                {format:'webp'}
            ]
        })
        console.log(optimizedImageUrl);

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id,{image});
        res.json({ success: true, message: "Image updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
