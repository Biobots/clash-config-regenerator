import express = require('express');
import fs = require('fs');
import mime = require('mime');
import {Config} from './utils/global'
import {User, getUser} from './utils/user'
import { dumpFile } from './utils/parser';

function startServ() {
	const app:express.Application = express();
	Config.load();

	app.get('/:id', async function(req:express.Request, res:express.Response) {
		let id:string = req.params.id
		let user:User = await getUser(id);
		user.generateDoc();
		let file:string = './tmp/'+id+'_output.yml'
		fs.writeFileSync(file, dumpFile(user), 'utf-8')
		res.writeHead(200, {'Content-type':<string>mime.getType(file), "Content-Disposition": 'attachment; filename=out.yml'});
		fs.createReadStream(file).pipe(res);
	});
	app.listen(Config.port, function() {
		console.log('running at ' + Config.port);
	});
}

export default startServ;
exports = module.exports = startServ;