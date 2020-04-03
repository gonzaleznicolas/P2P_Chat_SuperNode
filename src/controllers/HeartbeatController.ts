import { Request, Response } from "express";
import { firebaseObject } from "../config/Firebase";
import moment from "moment";
import { DB_COLLECTION_CHATROOMS } from "../config/constants";

export class HeartbeatController {
  private static validateBody(body: any) {
    return body.chatId && body.ip && body.port;
  }

  public handleHeartBeat(req: Request, res: Response) {
    console.log("Heartbeat received");

    const body = req.body;
    if (!HeartbeatController.validateBody(body)) {
      console.warn("Incorrect heartbeat received");
      res.send("Incorrect heartbeat received");
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(body.chatId)
      .get()
      .then(doc => {
        if (doc) {
          const members = doc.data()?.members as any[];
          members.push({
            ip: body.ip,
            port: body.port,
            lastSeen: moment().valueOf()
          });

          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(body.chatId)
            .set({ members: members }, { merge: true })
            .then(() => {
              res.send("Received Heartbeat");
            });
        } else {
          res.send("Chatroom id does not exist");
        }
      });
  }
}
