import { Config } from "./configs";
import * as Proxy from './proxy'
import * as Rule from './rule'

export function adaptRule(payload:Rule.PayloadRule, strategy:string): Rule.SingleRule {
	return new Rule.SingleRule(payload, strategy);
}

export function adaptRules(payload:Array<Rule.PayloadRule>|undefined, strategy:string): Array<Rule.SingleRule> {
	if (typeof(payload)=='undefined') return [];
	else return (<Array<Rule.PayloadRule>>payload).map(p => new Rule.SingleRule(p, strategy));
}

export function generateRuleByPayload() {
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