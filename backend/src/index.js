import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { configurePassport, passport } from "./lib/passport.js";

import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import { googleAuth } from "./controllers/auth.controller.js";

dotenv.config()
configurePassport();
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/auth", authRoute);

//Testing
app.get("/", (req, res) => {
    res.send('<a href="/api/auth/google">TRY</a>');
  });

app.get("/auth/google/callback",
    passport.authenticate('google', { session: false }),
    googleAuth
);


app.listen(process.env.PORT, ()=>{
    console.log("Server is running: ",PORT);
    connectDB();
})