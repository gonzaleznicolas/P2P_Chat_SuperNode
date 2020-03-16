import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { firebaseObject } from "../../config/Firebase";

export class ChatroomController extends CrudController {
  public create(req: Request, res: Response): void {
    // TODO
    res.json({ message: "CREATE /chatrooms request received" });
  }

  public async read(req: Request, res: Response): Promise<void> {
    const chatrooms = await firebaseObject
      .getCollection("chatrooms")
      .then(collection => {
        return collection.docs.map(doc => {
          return doc.data();
        });
      });

    res.json({ rooms: chatrooms });
  }

  public getMessages(req: Request, res: Response): void {
    console.log(res);
  }

  public update(req: Request, res: Response): void {
    // TODO
    res.json({ message: "UPDATE /chatrooms request received" });
  }

  public delete(req: Request, res: Response): void {
    // TODO
    res.json({ message: "DELETE /chatrooms request received" });
  }
}
