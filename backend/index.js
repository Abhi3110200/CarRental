import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

app.use(cors());

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})