import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "config";
import cors from "cors";

import logger from "./utils/logger";
import routes from "./routes/routes.index";
import dbConnect from "./utils/dbConnect";

const port = config.get<number>("port");

const server = express();

server.use(express.json());
server.use(cors());

server.listen(port, async () => {
  logger.info(`App is listening on port at localhost:${port}`);
  await dbConnect();
  routes(server);
});
