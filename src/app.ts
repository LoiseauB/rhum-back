import bodyParser from "body-parser";
import { Express, Router } from "express";

export const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

export const app: Express = express();

const defaultRoutes: Router = require("./routes/default");
const authRoutes: Router = require("./routes/auth");
const registerRoutes: Router = require("./routes/register");
const userRoutes: Router = require("./routes/user");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api", defaultRoutes);
app.use("/api/login", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/user", userRoutes);
