import express = require('express');
import http = require('http');
import {Config} from './utils/global'
import {User, getUser} from './utils/user'
import { dumpFile } from './utils/parser';

const app:express.Application = express();
let server:http.Server;
Config.load();

export function startServ() {
	app.get('/clash/:id', async function(req:express.Request, res:express.Response) {
		try {
			let id:string = req.params.id
			let user:User = await getUser(id);
			user.generateDoc();
			res.writeHead(200, {'Content-type': 'text/yaml', "Content-Disposition": 'attachment; filename=out.yml'});
			res.write(dumpFile(user));
			res.end();
		} catch(err) {
			console.log(err);
			res.writeHead(200);
			res.write(err);
			res.end();
		}
	});
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