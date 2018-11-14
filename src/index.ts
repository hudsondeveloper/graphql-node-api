import app from './app';
import * as http from 'http';
import { listenerCount } from 'cluster';

const server = http.createServer(app);

server.listen(3000);
server.on('listening',()=> console.log(`listening on port 3000`));