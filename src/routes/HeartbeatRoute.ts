import express, { Request, Response } from "express";
import {controllers} from "../controllers";

export const heartbeatRouter = express.Router({
    strict: true
});

heartbeatRouter.post("/", (req: Request, res: Response) => {
    controllers.heartbeatController.handleHeartBeat(req, res);
});
