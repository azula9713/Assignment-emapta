import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const dbConnect = async () => {
  const dbHost = config.get<string>("mongo.host");
  const dbPort = config.get<string>("mongo.dbPort");
  const dbUser = config.get<string>("mongo.username");
  const dbPassword = config.get<string>("mongo.password");

  const localUri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;
  try {
    await mongoose.connect(localUri);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default dbConnect;
