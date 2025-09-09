import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
// /?retryWrites=true&w=majority&appName=Cluster0
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
