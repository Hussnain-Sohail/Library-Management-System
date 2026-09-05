import dotenv from "dotenv";
import redisConnect from "./RedisClient.ts";
import express from "express";
import type { Express } from "express";
import cors from "cors";
import SignUpRouter from "../route/SignUpRoute.ts";
import Connect from "../model/connect.ts";
dotenv.config();
await Connect();
const PORT: number = 3500;
const App: Express = express();
App.use(cors(
    {
        credentials: true,
        origin: "http://localhost:5173"
    },
));
App.use(express.json());

App.use('/', SignUpRouter);

App.listen(PORT, () => { console.log(`listening on PORT ${PORT}`) });

// npx tsx server.ts