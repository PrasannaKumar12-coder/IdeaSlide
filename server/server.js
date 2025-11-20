import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Register from "./routes/Register.js";
import Login from "./routes/Login.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/* -------------------------------
   DATABASE CONNECTION
--------------------------------*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* -------------------------------
   SAMPLE ROUTE (Auth Example)
--------------------------------*/

// IMPORT ROUTES
app.use("/registration", Register);
app.use("/login", Login);


/* Dummy route to check server */
app.get("/", (req, res) => {
  res.send("Backend Running Successfully!");
});

/* -------------------------------
   START SERVER
--------------------------------*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
