import mongoose from "mongoose";

export const dbConnected = async () => {

    await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("MONGODB Connected 💽");
    }).catch((err) => {
        console.error(err);
        process.exit(0);
    })
    
} 