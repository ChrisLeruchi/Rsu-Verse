import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.ts";
import { connectDB } from "./lib/config/db.ts"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //This middleware is used to parse incoming JSON requests and make the data available in req.body.

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})