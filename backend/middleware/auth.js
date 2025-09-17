import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "akjdwjr2389dnd823nrndjnr293rh"); // use process.env.JWT_SECRET in real apps

    if (!decoded?.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Token error" });
  }
};
