import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

export const DBCon = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected.");
    })
    .catch(err => console.log("Failed to connect with Database."));
}