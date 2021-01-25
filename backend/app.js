import express from "express";
import config from "./config/config";

const app = express();

console.log(config);
const port = config.app.port;
app.listen(port);
