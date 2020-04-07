import express from 'express';
import { PORT } from './config/constants';
import { heartbeatRouter } from './routes/HeartbeatRoute';
import { chatroomRouter } from './routes/ChatroomRoute';
import { clearHeartbeatCron } from './crons/clearHeartbeatCron';
import { messageRouter } from './routes/MessageRoute';
import { pollingCron } from './crons/pollingCron';

const app = express();
app.use(express.json());

// Set routers for endpoints
app.use('/chatrooms', chatroomRouter);
app.use('/heartbeat', heartbeatRouter);
app.use('/message', messageRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Health page
app.get('/', (request, response) => {
  response.send('Server is running...');
});

// Start crons
clearHeartbeatCron();
pollingCron();
