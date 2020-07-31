import express = require('express');
import http = require('http');
import yaml = require('js-yaml');
import fs = require('fs');
import mime = require('mime');
import {Config} from './utils/configs'
import * as Parser from './utils/parsers'
import * as Net from './utils/network'
import * as Filter from './utils/filter'
import * as Process from './utils/process'

const app:express.Application = express();

app.get('/', function(req:express.Request, res:express.Response) {
	Promise.all(
		[
			Net.getRulePayload(), 
			Net.getProxies()
		])
		.finally(() => 
		{
			Process.generateRuleByPayload();
			Filter.filterProxies(Config.proxies);
			Process.processGroup(Config.Groups);
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

Config.load('config.yml');

app.listen(Config.port, function() {
	console.log('running at ' + Config.port);
});