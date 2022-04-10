import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null

export const connectDB = async (): Promise<MongoClient> => {
  if (client) {
    return client
  }

  const conn = await mongoose.connect(process.env.MONGO_URI!);
  client = conn.connection.getClient();
  return client;
}