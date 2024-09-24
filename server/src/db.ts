import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/conversedb",
            {
                useNewUrlParser: true
            } as ConnectOptions
        )
        console.log("🚀Connected to database successfuly!!")
    } catch (err) {
        console.error("⭕Could not connect to database!!")
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;