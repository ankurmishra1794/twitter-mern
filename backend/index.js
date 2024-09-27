import dotenv from 'dotenv';
import express from 'express';
import { DBCon } from './config/db.js';
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';

const _dirname = path.resolve();

dotenv.config({
    path: '.env'
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://twitter-mern-056s.onrender.com",
    credentials: true
}));

app.use("/api/v1/user", userRoute)
app.use("/api/v1/tweet", tweetRoute)

app.use(express.static(path.join(_dirname,"/frontend/build")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"frontend","build","index.html"));
});

app.listen(process.env.PORT, () => {
    DBCon();
    console.log(`Server listening at port ${process.env.PORT}`);
});