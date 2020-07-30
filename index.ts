import express = require('express');
import yaml = require('js-yaml');
import fs = require('fs');
import mime = require('mime');
import {Config} from './utils/configs'
import * as Parser from './utils/parsers'

const app:express.Application = express();

app.get('/', function(req:express.Request, res:express.Response) {
	Promise.all(
		[
			Parser.getRulePayload(), 
			Parser.getProxies()
		])
		.finally(() => 
		{
			Parser.processRule();
			Parser.filterProxies(Config.proxies);
			Parser.processGroup(Config.Groups);
			Parser.fillGroup(Config.Groups);
			Parser.fillProxies(Config.proxies);
			Parser.fillRules(Config.rules);
			Config.rawStr += yaml.safeDump(Config.OutConfig)
			Config.rawStr = Config.rawStr.replace('proxyGroups', 'proxy-groups')
			fs.writeFileSync('out.yml', Config.rawStr, 'utf-8')
			res.writeHead(200, {'Content-type':<string>mime.getType('out.yml'), "Content-Disposition": 'attachment; filename=out.yml'});
			fs.createReadStream('out.yml').pipe(res);
		})
});

app.listen(1234, function() {
	console.log('running');
	Config.load('config.yml');
});