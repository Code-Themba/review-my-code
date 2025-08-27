import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { dbConn } from "./backend/config/db.js";
import userAuth from "./backend/routes/userAuth.js";
const app = express();
const PORT = 8000;

// Run database
dbConn();

// Express Middleware
app.use(express.json());

app.use("/api/users/", userAuth);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
