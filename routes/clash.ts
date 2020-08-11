import express = require('express');
import { User, getUser } from '../utils/user';
import { dumpFile } from '../utils/parser';
let router = express.Router();

router.use((req, res, next) => {
	console.log(JSON.stringify({
		"Api": req.url,
		'Time': Date.now()
	}));
	next();
});

router.get('/', (req, res) => {
	res.send('any');
});

router.get('/:id', async function(req:express.Request, res:express.Response) {
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

module.exports = router;