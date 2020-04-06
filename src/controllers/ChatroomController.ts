import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import moment from 'moment';
import { Chatroom, Message } from '../models/Chatroom';
import { CreateChatroomRequest, GetChatroomRequest } from '../models/Requests';
import { v4 as uuidv4 } from 'uuid';

export class ChatroomController {
  private static validateCreateChatRoomBody(body: any) {
    return body.name;
  }

  private static validateGetChatroomBody(body: any) {
    return body.userId && body.chatId && body.ip && body.port;
  }

  public createChatroom(req: Request, res: Response) {
    const createChatroomRequest = req.body as CreateChatroomRequest;

    if (ChatroomController.validateCreateChatRoomBody(createChatroomRequest)) {
      const newChatroom = {
        id: uuidv4(),
        log: [],
        members: [],
        name: req.body.name,
        toBePolled: false,
      };
      firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
        .doc(newChatroom.id)
        .set(newChatroom)
        .then(() => {
          console.log('Created chatroom ' + createChatroomRequest.name);
          res.send('Created chatroom ' + createChatroomRequest.name);
        });
    } else {
      res.send('Invalid create chatroom request');
    }
  }

  public readAllChatrooms(req: Request, res: Response) {
    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .get()
      .then((collection) => {
        const chatrooms = collection.docs.map((doc) => {
          const chatroom = doc.data() as Chatroom;
          return {
            chatRoomId: chatroom.id,
            chatRoomName: chatroom.name,
          };
        });

        res.json({ rooms: chatrooms });
      });
  }

  public getChatRoomMembers(req: Request, res: Response) {
    const chatRoomRequest = req.body as GetChatroomRequest;
    if (!ChatroomController.validateGetChatroomBody(chatRoomRequest)) {
      console.warn('Incorrect chatroom request received');
      res.send('Incorrect chatroom request received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(chatRoomRequest.chatId)
      .get()
      .then((doc) => {
        const chatroom = doc.data() as Chatroom;
        const members = chatroom.members.filter((member) => {
          const currentMoment = moment().valueOf();
          return currentMoment - member.lastSeen < 5000;
        });

        // Set members to be the filtered members
        if (members.length < chatroom.members.length) {
          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(chatroom.id)
            .set({ members: members }, { merge: true })
            .then(() => {
              console.log('Cleared stale members for chat: ' + chatroom.name);
            });
        }

        let returnBody = { members: members, log: [] as Message[] };

        if (members.length === 0) {
          returnBody.log = chatroom.log;

          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(chatRoomRequest.chatId)
            .set(
              {
                members: [
                  {
                    ip: chatRoomRequest.ip,
                    lastSeen: moment().valueOf(),
                    port: chatRoomRequest.port,
                    userId: chatRoomRequest.userId,
                  },
                ],
              },
              { merge: true },
            )
            .then(() => {
              console.debug('Added first user to chatroom: ' + chatRoomRequest.chatId);
            });
        }

        res.json(returnBody);
      });
  }
}
