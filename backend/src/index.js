import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import roomRoute from "./routes/room.route.js"
import messageRoute from "./routes/message.route.js"
import cors from "cors"
import path from "path"

import { app, server } from "./lib/socket.js";
import { configurePassport, passport } from "./lib/passport.js";
import { connectDB } from "./lib/db.js";

dotenv.config()
configurePassport();
const PORT = process.env.PORT
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(cors({
//   origin: "http://localhost:5173", 
//   // credentials: true, 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     // allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'X-Request-With'], 
// }));

app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
}))

app.use("/api/auth", authRoute);
app.use("/api/room", roomRoute);
app.use("/api/message", messageRoute);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.use(express.static(path.join(__dirname, "../frontend/public")));
    
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
//   }
  

// Testing
app.get("/", (req, res) => {
    res.send('<a href="/api/auth/google">TRY</a>');
  });

// app.get("/auth/google/callback",
//     passport.authenticate('google', { session: false }),
//     googleAuth
// );


server.listen(process.env.PORT, ()=>{
    console.log("Server is running: ",PORT);
    connectDB();
})
