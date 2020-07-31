import yaml = require('js-yaml');
import fs = require('fs');
import http = require('http');
import { BaseProxy, BaseProxyGroup } from './proxy';
import { PayloadRule, SingleRule } from './rule';
import { parseProxyGroups } from './parsers';

export class Config {

	static port:number = 1234
	static final:string

	static proxyurl:Array<string> = []
	static ruleurl:Map<string, string[]> = new Map<string, string[]>()
	static Groups:Array<BaseProxyGroup> = []

	proxies:Array<BaseProxy> = []
	filteredProxies:Map<string, Array<BaseProxy>> = new Map<string, Array<BaseProxy>>()
	rules:Array<SingleRule> = []
	rulepayloads:Map<string, PayloadRule[]> = new Map<string, PayloadRule[]>()

	rawStr:string = fs.readFileSync('header.yml', 'utf-8') + '\n';

	OutConfig:any = {
		proxies:[],
		proxyGroups:[],
		rules:[]
	}

	public static load(path:string) {
		try {
			let configfile:any = yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
			//server config
			Config.port = configfile.generatorConfig.port;
			Config.final = configfile.generatorConfig.final;
			//generator config
			Config.proxyurl = configfile.proxy;
			configfile.rule.forEach((r:any) => {
				Config.ruleurl.set(r.name, r.url);
			});
			Config.Groups = parseProxyGroups(configfile.groups);
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}
}