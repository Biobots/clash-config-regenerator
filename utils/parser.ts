import yaml = require('js-yaml');
import fs = require('fs');
import * as Proxy from './proxy'
import * as Net from './network'
import { User } from './user';
import { Rule, RuleGroup } from './rule';

export function parseProxies(proxies:Array<any>): Array<Proxy.BaseProxy> {
	if (typeof(proxies)=='undefined' || proxies == null) return [];
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
					p = new Proxy.SelectProxyGroup(item);
					break;
			}
			return p;
		});
	return rst;
}

export async function buildProxies(usr:User) {
	let rst = await Net.getUrls(usr.config.sub);
	usr.proxies = rst.map(item => item.data)
		.map(doc => <any>yaml.safeLoad(doc))
		.map(obj => <any[]>obj.proxies)
		.map(raw => parseProxies(raw))
		.reduce((all, cur) => all.concat(cur));
	usr.proxies = usr.proxies.concat(parseProxies(usr.config.proxy));
}

export async function buildRuleGroups(usr:User) {
	usr.rules = await Promise.all(
		usr.config.rule.map(
			async (r: any) => {
				let payload:Array<Rule> = [];
				if (!(typeof (r.url) == 'undefined' || r.url == null)) {
					let rst = await Net.getUrls(r.url);
					payload = rst.map(item => item.data)
						.map(doc => <any>yaml.safeLoad(doc))
						.map(obj => <any[]>obj.payload)
						.map(raw => raw.map((s: string) => new Rule(s)))
						.reduce((all, cur) => all.concat(cur));
				}
				if (!(typeof (r.extra) == 'undefined' || r.extra == null)) {
					payload = payload.concat(r.extra.map((record: string) => new Rule(record)));
				}
				return new RuleGroup(r.name, r.prior, payload);
			}
		)
	)
}

export function filterProxy(keys:Array<string[]>, proxies:Proxy.BaseProxy[]) {
	let output = proxies;
	//keys.forEach(k => {
	//	output = output.filter(proxy => proxy.name.includes(k));
	//});
	output = output.filter(proxy => keys.every(k => k.some(kk => proxy.name.includes(kk))))
	return output;
}

export function dumpFile(usr:User) {
	let str = usr.header+'\n';
	str += yaml.safeDump(usr.doc);
	str = str.replace('proxyGroups', 'proxy-groups');
	return str;
}