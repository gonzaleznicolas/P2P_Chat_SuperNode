import express from "express";
import { PORT } from "./config/constants";
import { chatroomRouter } from "./routes";

const app = express();
app.use(express.json());

app.use("/chatrooms", chatroomRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("Server is running...");
});
