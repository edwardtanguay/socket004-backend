import express from 'express';
import http from 'http';
import cors from 'cors';
import * as config from './config.js';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ["GET", "POST"],
	},
});

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(`
<h1>Socket.io Server</h1>	
<p>This backend connects socket.io clients and enables communication between them.</p>
	`)
});

io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`);
	});

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});
});

httpServer.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});