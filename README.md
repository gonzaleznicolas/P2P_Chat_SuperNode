#CentralServer

## Setup (dev)
1. Make sure you have node.js v12.
2. Install typescript `npm install -g typescript`
3. Install 
4. Run `npm install`
5. Run `npm run dev`

## Deploy
1. Run `gcloud init`. Requires authorization.
2. Run `npm run deploy`

##Endpoints

#### GET /chatrooms

Get all chatroom names and their ids

##### Sample Response

```
{
    "rooms": [
        {
            "chatRoomId": "J2b3gDpktJS4l4Vc3NGq",
            "chatRoomName": "Basketball"
        },
        {
            "chatRoomId": "aCh2iBdMOpu6y3Bh1dEL",
            "chatRoomName": "Soccer"
        }
    ]
}
```

#### POST /chatrooms

Get details for a specific chatroom

##### Sample Body

```
{
	"chatId": "aCh2iBdMOpu6y3Bh1dEL",
	"ip": "127.0.0.1",
	"port": "5002"
	"userId": "dsfsdjsdkfs"

}
```

##### Sample Responses

If members array is empty

```
{
     "members": [],
     "log": [
     		{
     			"username": "User 1", 
     			"message": "Hello world",
     			"userId": "sdfsdf"
     		}, 
     		{
     			"username": "User 2", 
     			"userId": "sdfdsf",
     			"message": "World Hello!"
     		}
     	]
 }
```

If members array is not empty

```
{
    "members": [
        {
            "ip": "127.0.0.1",
            "lastSeen": 1585972707218,
            "port": "5002",
            "userId": "sdfsdfdsf"
        }
    ],
    "log": []
}
```

#### POST /chatrooms/create

Create a chatroom

##### Sample Body

```
{
	"name": "newChatRoom"
}
```

##### Sample Responses

Indicates if creation was successful, or provides a error message.

#### POST /heartbeat

Post a heartbeat message

##### Sample Body

```
{
	"userId": "sdfsdfdsf",
	"chatId": "aCh2iBdMOpu6y3Bh1dEL",
	"ip": "127.0.0.1",
	"port": "5002"
}
```

##### Sample Response

Received Heartbeat

`Heartbeat received`

Received Heartbeat and Requires Message History

`Heartbeat received - Send message history`

#### POST /messages

##### Sample Body

```
{
	"chatId": "aCh2iBdMOpu6y3Bh1dEL",
	"log": [
		{
			"userId": "sdfsd3234hdsf"
			"username": "User 1"
			"message": "Hello world"
		},
		{
			"userId": "dsfsi3i324osd"
			"username": "User 2"
			"message": "World Hello!"
		}
	]
}
```

##### Sample Response

Indicates if insertion was successful, or provides a error message.
