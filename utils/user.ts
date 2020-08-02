import yaml = require('js-yaml');
import fs = require('fs');
import path = require('path')
import {Config} from './global'
import * as Proxy from './proxy'
import * as Parser from './parser'
import * as Rule from './rule'

export class User {

	header:string=''
	config:any
	proxies:Proxy.BaseProxy[]=[]
	rules:Rule.RuleGroup[]=[]

	groups:Proxy.BaseProxyGroup[]=[]

	doc:any = {
		proxies:[],
		proxyGroups:[],
		rules:[]
	}

	constructor(id:string) {
		try {
			this.config = yaml.safeLoad(fs.readFileSync(path.join(Config.configDir, id+'.yml'), 'utf-8'));
			this.header = fs.readFileSync(this.config.header, 'utf-8');
			
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}

	buildProxyGroups() {
		this.groups = Parser.parseProxyGroups(this.config.groups);
		this.groups.forEach(g => {
			if (g.keywords!=null)
			{
				let keywords = g.keywords.split(' ');
				g.proxies = Parser.filterProxy(keywords, this.proxies);
			}
		})
	}

	generateDoc() {
		this.generateProxies();
		this.generateRules();
		this.generateGroups();
	}

	generateProxies() {
		this.proxies.forEach(item => {
				this.doc.proxies.push(item.raw);
			})
	}

	generateRules() {
		this.rules.sort((a, b) => a.prior - b.prior)
			.map(r => r.getRaw())
			.forEach(s => s.forEach(ss => this.doc.rules.push(ss)));
		this.doc.rules.push('MATCH,'+this.config.final);
	}

	generateGroups() {
		this.groups.forEach(item => {
			this.doc.proxyGroups.push(item.getRaw());
		})
	}
}

export async function getUser(id:string) {
	let usr = new User(id);
	await Parser.buildProxies(usr);
	await Parser.buildRuleGroups(usr);
	usr.buildProxyGroups();
	return usr;
}