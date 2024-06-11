import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log('Connected already to the database');
        return;
    }
    if(connectionState === 2) {
        console.log('Connecting to database...');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Hatsta",
            bufferCommands: true,
        });
        console.log("connected to the database");
    } catch (error) {
        console.log("Error: ", error);
        throw new Error("Error: ", error)
    }
};

export default connectToDB