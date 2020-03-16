import express, { Request, Response } from "express";
import { chatroomController } from "../../controllers";

export const router = express.Router({
  strict: true
});

router.post("/", (req: Request, res: Response) => {
  chatroomController.create(req, res);
});

router.get("/", (req: Request, res: Response) => {
  chatroomController.read(req, res);
});

router.get("/messages", (req: Request, res: Response) => {
  chatroomController.getMessages(req, res);
});

router.patch("/", (req: Request, res: Response) => {
  chatroomController.update(req, res);
});

router.delete("/", (req: Request, res: Response) => {
  chatroomController.delete(req, res);
});
