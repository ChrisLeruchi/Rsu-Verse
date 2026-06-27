import mongoose from "mongoose";
import "dotenv/config";


export const connectDB = async () => {
    try{
        const mongoConnect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Database connected ${mongoConnect.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

