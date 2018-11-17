"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
//import * as http from 'http';
const app_1 = require("./app");
const models_1 = require("./models");
const utils_1 = require("./utils/utils");
const server = http.createServer(app_1.default);
const port = utils_1.normalizePort(process.env.port || 3000);
/*
db.sequelize.sync().then(()=>{
    server.listen(port);
    server.on(`error`,onError(server));
    server.on('listening',onListening(server));

});
*/
models_1.default.sequelize.sync({ force: true })
    .then(() => {
    console.log(`Database & tables created!`);
    server.listen(port);
    // server.on(`error`,onError(server));
    server.on('listening', utils_1.onListening(server));
});
