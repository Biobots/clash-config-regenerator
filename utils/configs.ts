import yaml = require('js-yaml');
import fs = require('fs');
import http = require('http');
import { BaseProxy, BaseProxyGroup } from './proxy';
import { PayloadRule, SingleRule } from './rule';
import { parseProxyGroups } from './parsers';

export class Config {

	static port:number = 1234

	static proxyurl:Array<string> = []
	static ruleurl:Map<string, string[]> = new Map<string, string[]>()
	static DstLoc:Array<string> = []
	static SrcLoc:Array<string> = []
	static Groups:Array<BaseProxyGroup> = []

	static proxies:Array<BaseProxy> = []
	static filteredProxies:Map<string, Array<BaseProxy>> = new Map<string, Array<BaseProxy>>()
	static rules:Array<SingleRule> = []
	static rulepayloads:Map<string, PayloadRule[]> = new Map<string, PayloadRule[]>()

	static rawStr:string = ''

	static OutConfig:any = {
		proxies:[],
		proxyGroups:[],
		rules:[]
	}

	public static load(path:string) {
		try {
			let configfile:any = yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
			//server config
			Config.port = configfile.generatorConfig.port;
			//generator config
			Config.proxyurl = configfile.proxy;
			configfile.rule.forEach((r:any) => {
				Config.ruleurl.set(r.name, r.url);
			});
			Config.DstLoc = configfile.dst;
			Config.SrcLoc = configfile.src;
			Config.Groups = parseProxyGroups(configfile.groups);
			this.rawStr = fs.readFileSync('header.yml', 'utf-8') + '\n';
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}
}