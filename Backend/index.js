import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoose.js";
import { errorHandler } from "./controllers/errorHandler.js";
import userRouter from "./routers/userRoute.js";
import { cloudinaryConfig } from "./config/cloudinary.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("*",cloudinaryConfig)

app.listen(process.env.PORT, () => {
  console.log("SERVER IS LISTENING TO PORT: ", process.env.PORT);
});

connectDB();

app.use("/api", userRouter);
app.use(errorHandler);
