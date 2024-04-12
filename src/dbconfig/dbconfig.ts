import mongoose from "mongoose";

export async function connect(){
    try {
        
       await mongoose.connect(process.env.MONGODB_URI!+"AuthWithNextjs");
        // console.log(process.env.MONGODB_URI)
        const connection = mongoose.connection;
        connection.on("Connected", () => {
            console.log("DB connected");
        });
        connection.on("error", (error) => {
            console.log("error connecting to DB : ",error);
            process.exit(1);
        });

    } catch (error) {
        console.log(`Something went wrong in connecting to DB ${error}`);
    }
}