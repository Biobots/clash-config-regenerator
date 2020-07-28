import express = require('express');
import yaml = require('js-yaml');
import fs = require('fs');
import Axios, { AxiosResponse } from 'axios';
import * as Proxy from './utils/proxy'
import * as Rule from './utils/rule'
import {Config} from './utils/configs'
import * as Parser from './utils/parsers'

const app:express.Application = express();

app.get('/', function(req:express.Request, res:express.Response) {
	let ret:any = 'fail'
	
	//proxies
	let proxies:Array<Proxy.BaseProxy>=[];
	let promises:Array<Promise<AxiosResponse<any>>>=[]
	Config.proxyurl.forEach(url => promises.push(Axios.get(url)));
	Promise.all(promises)
		.then(res => {
			proxies = res.map(item => item.data)
				.map(doc => <any>yaml.safeLoad(doc))
				.map(obj => <Array<any>>obj.proxies)
				.map(raw => Parser.parseProxies(raw))
				.reduce((all, cur) => all.concat(cur))
		})
		.finally(() => {
			proxies = Parser.filterBySrcLoc(proxies, '香港');
			ret = proxies;
			res.send(ret);
		})
});

app.listen(1234, function() {
	console.log('running');
	Config.load('config.yml');
});