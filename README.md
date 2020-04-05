#CentralServer

##Enpoints

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
}
```

##### Sample Responses
If members array is empty

```
{
     "members": [],
     "log": [
         {
             "message": "Hello world",
             "userId": "sdfsdf"
         },
         {
             "message": "World Hello!",
             "userId": "sdfsdfdsfds"
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

##### Sample Responses (TBD)

Success

`Created chatroom newChatRoom`


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

##### Sample Response (TBD)

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
			"userId": "sdfsdf",
			"username": "User 1"
			"message": "Hello world"
		}, 
		{
			"userId": "sdfsdfdsfds",
			"username": "User 2"
			"message": "World Hello!"
		}
	] 
}
```

##### Sample Response (TBD)

