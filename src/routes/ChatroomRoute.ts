import express, { Request, Response } from "express";
import { controllers } from "../controllers";

export const chatroomRouter = express.Router({
  strict: true
});

chatroomRouter.get("/", (req: Request, res: Response) => {
  controllers.chatroomController.readAllChatrooms(req, res);
});

chatroomRouter.post("/", (req: Request, res: Response) => {
  if (req.body.chatId) {
    controllers.chatroomController.getChatRoomMembers(req, res);
  }
});
