import yaml = require('js-yaml');
import fs = require('fs');

export class Config {
	static proxyurl:Array<string> = []
	static ruleurl:Array<string> = []
	static DstLoc:Array<string> = []
	static SrcLoc:Array<string> = []

	public static load(path:string) {
		let configfile:any = yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
		Config.proxyurl = configfile.proxy;
		Config.ruleurl = configfile.rule;
		Config.DstLoc = configfile.dst;
		Config.SrcLoc = configfile.src;
	}
}