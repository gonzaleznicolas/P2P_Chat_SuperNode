import { Request, Response } from "express";
import { firebaseObject } from "../config/Firebase";
import {DB_COLLECTION_CHATROOMS} from "../config/constants";

export class ChatroomController {
  public create(req: Request, res: Response): void {
    // TODO
    res.json({ message: "CREATE /chatrooms request received" });
  }

  public readAllChatrooms(req: Request, res: Response) {
    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .get()
      .then(collection => {
        const chatrooms = collection.docs.map(doc => {
          return {
            chatRoomId: doc.data().id,
            chatRoomName: doc.data().name
          };
        });

        res.json({ rooms: chatrooms });
      });
  }

  public getChatRoomMembers(req: Request, res: Response) {
    const members = firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(req.body.chatId)
      .get()
      .then(doc => {
        const members = doc.data()?.members ? doc.data()?.members : [];

        if (members.length === 0) {
          // TODO:
          // Send message history in response
          console.log(req.body);
        }

        res.json({ members: members });
      });
  }
}
