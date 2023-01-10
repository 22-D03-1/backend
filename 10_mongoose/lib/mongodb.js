import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI || !process.env.DATABASE)
    throw new Error("no database connection string or database name provided");

const connection = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("connection established");

const db = connection.db(process.env.DATABASE);

export default db;
