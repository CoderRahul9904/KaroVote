import http from 'http';
import app from './app';
import connectDB from './config/database';   // your Mongo connection
import attachWebSocket from './websocket';

const PORT = process.env.PORT || 4000;

connectDB();

const server = http.createServer(app);
attachWebSocket(server);


server.listen(PORT, () => {
  console.log(`🚀 Pollify listening on http://localhost:${PORT}`);
});
