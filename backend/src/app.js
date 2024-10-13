import sockets from "./socket/routes.js";
import dotenv from "dotenv";
dotenv.config({
    path: '../.env'
})
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express()

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
        //   credentials: true
    }
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true , limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

io.on("connection", sockets);

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.get("/", (req, res) => {
    // res.json({data:"helo world from socket"})
    res.sendFile(__dirname + "/index.html")
})

httpServer.listen(8080, () => {
    console.log("server is running")
})

//routes

// import userRouter from './routes/user.routes.js'


// //routes decelaration

// app.use("/api/v1/users" , userRouter);


export { app }













// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// app.get("/",(req,res)=>{
//     // res.json({data:"helo world from socket"})
//     res.sendFile(__dirname+"/index.html")
// })