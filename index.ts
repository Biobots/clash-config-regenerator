import express = require('express');
import http = require('http');
import {Config} from './utils/global'

const app:express.Application = express();
let server:http.Server;
Config.load();

app.use('/clash', require('./routes/clash'));

export function startServ() {
	server = app.listen(Config.port, function() {
		console.log('running at ' + Config.port);
	});
}

export function stopServ() {
	server.close(err => { console.log(err); process.exit(1);});
	console.log('stopped');
	process.exit(0);
}

module.exports.start = startServ;
module.exports.stop = stopServ;