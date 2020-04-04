import express from "express";
import { PORT } from "./config/constants";
import { heartbeatRouter } from "./routes/HeartbeatRoute";
import { chatroomRouter } from "./routes/ChatroomRoute";
import { clearHeartbeatCron } from "./clearHeartbeatCron";
import { messageRouter } from "./routes/MessageRoute";

const app = express();
app.use(express.json());

app.use("/chatrooms", chatroomRouter);
app.use("/heartbeat", heartbeatRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("Server is running...");
});

clearHeartbeatCron();
