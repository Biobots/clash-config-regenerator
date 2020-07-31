import {Config} from './configs'
import Axios, { AxiosResponse } from 'axios';
import yaml = require('js-yaml');
import * as Rule from './rule'
import { parseProxies, parseRulePayload } from './parsers';

export async function getProxies() {
	let promises:Array<Promise<AxiosResponse<any>>>=[]
	Config.proxyurl.forEach(url => promises.push(Axios.get(url)));
	const res = await Promise.all(promises);
	Config.proxies = res.map(item => item.data)
		.map(doc => <any>yaml.safeLoad(doc))
		.map(obj => <Array<any>>obj.proxies)
		.map(raw => parseProxies(raw))
		.reduce((all, cur) => all.concat(cur));
}

export function getSinglePaylaod(url:string, name:string) {
	let promise:Promise<AxiosResponse<any>> = Axios.get(url);
	return promise.then(res => 
		Config.rulepayloads.has(name) ?
		Config.rulepayloads.set(name, 
			<Rule.PayloadRule[]>(Config.rulepayloads.get(name))
				?.concat(parseRulePayload((<any>yaml.safeLoad(res.data)).payload))) :
		Config.rulepayloads.set(name, parseRulePayload((<any>yaml.safeLoad(res.data)).payload))
	);
}

export async function getRulePayload() {
	let promises:Array<Promise<Map<string, Rule.PayloadRule[]>>>=[]
	Config.ruleurl.forEach((urls, name) => urls.forEach(url => promises.push(getSinglePaylaod(url, name))));
	await Promise.all(promises);
}