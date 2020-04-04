#CentralServer

##Enpoints

#### GET /chatrooms

Get all chatroom names and their ids

#### POST /chatrooms

Get details for a specific chatroom

##### Sample Body

`{ "chatId": "aCh2iBdMOpu6y3Bh1dEL", "ip": "127.0.0.1", "port": "5002" }`

##### POST /heartbeat

Post a heartbeat message

##### Sample Body

`{ "userId": "asdjkfhjsdhsdf" "chatId": "aCh2iBdMOpu6y3Bh1dEL", "ip": "127.0.0.1", "port": "5002" }`

##### POST /messages

##### Sample Body

`{ "chatId": "aCh2iBdMOpu6y3Bh1dEL", "log": [<message_log_array>] }`
