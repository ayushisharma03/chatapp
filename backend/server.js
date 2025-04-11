import dotenv from "dotenv";
dotenv.config();  // Load environment variables
import cookieParser from "cookie-parser";
import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming request with JSON payloads(from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes); // middleware
app.use("/api/messages", messageRoutes); // corrected route path
app.use("/api/users", userRoutes); // corrected route path

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
