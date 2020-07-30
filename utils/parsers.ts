import {Config} from './configs'
import Axios, { AxiosResponse } from 'axios';
import yaml = require('js-yaml');
import * as Proxy from './proxy'
import * as Rule from './rule'

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
	return promise.then(res => Config.rulepayloads.set(name, parseRulePayload((<any>yaml.safeLoad(res.data)).payload)))
}

export async function getRulePayload() {
	let promises:Array<Promise<Map<string, Rule.PayloadRule[]>>>=[]
	Config.ruleurl.forEach((url, name) => promises.push(getSinglePaylaod(url, name)));
	await Promise.all(promises);
}

export function parseProxies(proxies:Array<any>): Array<Proxy.BaseProxy> {
	let rst:Array<Proxy.BaseProxy> = proxies
		.map((item) => {
			var p:Proxy.BaseProxy;
			switch (item.type) {
				case 'vmess':
					p = new Proxy.Vmess(item);
					break;
				case 'ss':
					p = new Proxy.Shadowsocks(item);
					break;
				case 'socks5':
					p = new Proxy.Socks5(item);
					break;
				case 'http':
					p = new Proxy.Http(item);
					break;
				case 'trojan':
					p = new Proxy.Trojan(item);
					break;
				default:
					p = new Proxy.BaseProxy(item);
					break;
			}
			return p;
		});
	return rst;
}

export function parseProxyGroups(proxyGroups:Array<any>): Array<Proxy.BaseProxyGroup> {
	let rst:Array<Proxy.BaseProxyGroup> = proxyGroups
		.map((item) => {
			var p:Proxy.BaseProxyGroup;
			switch (item.type) {
				case 'select':
					p = new Proxy.SelectProxyGroup(item);
					break;
				case 'urltest':
					p = new Proxy.UrlTestProxyGroup(item);
					break;
				default:
					p = new Proxy.BaseProxyGroup(item);
					break;
			}
			return p;
		});
	return rst;
}

export function parseSingleRule(payload:string): Rule.SingleRule {
	let str:Array<string> = payload.split(',');
	return new Rule.SingleRule(new Rule.PayloadRule(payload), str[2]);
}

export function parseRulePayload(payload:Array<any>): Array<Rule.PayloadRule> {
	return payload.map(p => new Rule.PayloadRule(p));
}

export function filterByDstLoc(proxies:Array<Proxy.BaseProxy>, key:string): Array<Proxy.BaseProxy> {
	return proxies.filter(proxy => typeof(proxy.dstLoc)==undefined?false:proxy.dstLoc===key);
}

export function filterBySrcLoc(proxies:Array<Proxy.BaseProxy>, key:string): Array<Proxy.BaseProxy> {
	return proxies.filter(proxy => typeof(proxy.srcLoc)==undefined?false:proxy.srcLoc===key);
}

export function testFilterProxies(proxies:Array<Proxy.BaseProxy>) {
	Config.DstLoc.forEach(key => {
		Config.filteredProxies.set(key, filterByDstLoc(proxies, key));
	})
}

export function filterProxies(proxies:Array<Proxy.BaseProxy>) {
	Config.Groups.forEach(g => {
		let keywords = g.keywords.split(' ');
		let fProxies:Array<Proxy.BaseProxy> = proxies;
		keywords.forEach(k => {
			fProxies = fProxies.filter(proxy => proxy.name.includes(k));
		});
		Config.filteredProxies.set(g.keywords, fProxies);
	});
}

export function adaptRule(payload:Rule.PayloadRule, strategy:string): Rule.SingleRule {
	return new Rule.SingleRule(payload, strategy);
}

export function adaptRules(payload:Array<Rule.PayloadRule>|undefined, strategy:string): Array<Rule.SingleRule> {
	if (typeof(payload)=='undefined') return [];
	else return (<Array<Rule.PayloadRule>>payload).map(p => new Rule.SingleRule(p, strategy));
}

export function processRule() {
	Config.rulepayloads.forEach((rules, name) => {
		if (Config.Groups.findIndex(g => g.name===name)>-1)
		{
			Config.rules = Config.rules.concat(adaptRules(rules, name))
		}
	});
}

export function processGroup(input:Array<Proxy.BaseProxyGroup>) {
	input.forEach(i => {
		let proxies = Config.filteredProxies.get(i.keywords);
		if (typeof(proxies)!='undefined') {
			proxies.forEach(p => i.proxies.push(p))
			Config.filteredProxies.set(i.keywords, proxies)
		}
	})
}

export function fillGroup(input:Array<Proxy.BaseProxyGroup>) {
	input.forEach(g => {
		let t:any = { name:'', type:'', proxies:[]}
		t.name = g.name;
		switch (g.type) {
			case Proxy.ProxyGroupType.Select:
				t.type = 'select';
				break;
			case Proxy.ProxyGroupType.UrlTest:
				t.type = 'url-test';
				t.url = (<Proxy.UrlTestProxyGroup>g).url;
				t.interval = (<Proxy.UrlTestProxyGroup>g).interval;
				break;
			default:
				t.type = ' ';
				break;
		}
		t.proxies = g.proxies.map(p => p.name);
		if (g.direct) t.proxies.push('DIRECT');
		if (g.reject) t.proxies.push('REJECT');
		Config.OutConfig.proxyGroups.push(t);
	})
}

export function fillProxies(input:Array<Proxy.BaseProxy>) {
    input.map(p => p.raw)
		.forEach(item => {
		    Config.OutConfig.proxies.push(item)
		})
}

export function fillRules(input:Array<Rule.SingleRule>) {
	input.map(r => r.payload.type+','+r.payload.content+','+r.strategy)
		.forEach(item => {
			Config.OutConfig.rules.push(item)
		})
}