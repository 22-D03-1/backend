import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`)
    .then(() => console.log("connected via mongoose"));
