const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  console.log("🔄 Attempting MongoDB connection...");

  if (mongoUri) {
    console.log("⚙️  Using MONGO_URI from .env");
  } else {
    console.log("⚙️  No MONGO_URI provided; will use in-memory MongoDB");
  }

  const connect = async (uri) => {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  };

  try {
    if (mongoUri) {
      await connect(mongoUri);
    } else {
      throw new Error("No MONGO_URI");
    }
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);

    console.log("\nℹ️  Falling back to in-memory MongoDB for development...");

    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();

    await connect(memoryUri);
    console.log("✅ Connected to in-memory MongoDB");
  }
};

module.exports = connectDB;
