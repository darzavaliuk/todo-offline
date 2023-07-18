import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {router} from "./routes.js";
import dotenv from 'dotenv'

dotenv.config()

let app = express();
let port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})

const mongoURI = process.env.MONGO

    mongoose.connect(mongoURI)
        .then(() => console.log("connect to db"))
        .catch(er => console.log(er))

app.use("/", router);