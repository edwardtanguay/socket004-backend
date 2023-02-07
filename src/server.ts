import express from 'express';
import cors from 'cors';
import * as config from './config.js';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send('socket.io demo')
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});