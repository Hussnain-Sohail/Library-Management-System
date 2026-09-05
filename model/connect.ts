import mongoose from "mongoose";

async function Connect(): Promise<void> {
    try {
        const mongoDB_URL: string | undefined = process.env.MONGO_DB_URL;

        if (mongoDB_URL === undefined) {
            console.log("Could not connect to mongo db");
            return;
        }

        mongoose.connect(mongoDB_URL);
        console.log("connected to mongodb");
    }
    catch (error) {
        console.error(error);
    }
}

export default Connect;