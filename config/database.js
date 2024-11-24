import mongoose from "mongoose";
import env from "dotenv"

env.config();

// connecion string 
const url = process.env.CONNECTION_URL

// MongoDb connection function
export async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error("ERROR on MongoDB Connection => ", err.message);
    }
}