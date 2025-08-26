import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { dbConn } from "./backend/config/db.js";
const app = express();
const PORT = 8000;

// Run database
dbConn();

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
