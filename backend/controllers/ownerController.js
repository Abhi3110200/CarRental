import User from "../models/User.js";

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

export const addCar = async(req,res)=>{
    try {
        const {_id}=req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}