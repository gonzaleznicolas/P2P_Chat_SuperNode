export class Chatroom {
  public id: string = '';
  public name: string = '';
  public members: Member[] = [];
  public log: Message[] = [];
}

export class Member {
  public userId: string = '';
  public ip: string = '';
  public port: string = '';
  public lastSeen: number = 0;
}

export class Message {
  public userId: string = '';
  public message: string = '';
}
