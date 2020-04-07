/**
 * Models a Chatroom collection stored in the DB
 */
export class Chatroom {
  public id: string = '';
  public name: string = '';
  public members: Member[] = [];
  public log: Message[] = [];
  public toBePolled: boolean = false;
}

/**
 * Models a Member object in the DB
 */
export class Member {
  public userId: string = '';
  public ip: string = '';
  public port: string = '';
  public lastSeen: number = 0;
}

/**
 * Models a Message object in the DB
 */
export class Message {
  public username: string = '';
  public userId: string = '';
  public message: string = '';
}
