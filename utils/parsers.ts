import {Config} from './configs'
import * as Proxy from './proxy'
import * as Rule from './rule'

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
					p = new Proxy.SelectProxyGroup(item);
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

export function fillGroup(input:Array<Proxy.BaseProxyGroup>) {
	input.forEach(g => {
		Config.OutConfig.proxyGroups.push(g.getRaw());
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