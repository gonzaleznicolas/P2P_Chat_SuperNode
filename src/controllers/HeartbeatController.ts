import { Request, Response } from "express";

export class HeartbeatController {
  public handleHeartBeat(req: Request, res: Response) {
      console.log('Heartbeat received');
      res.send('Received Heartbeat')
  }
}
