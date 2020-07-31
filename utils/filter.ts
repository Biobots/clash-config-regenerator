import { Config } from "./configs";
import * as Proxy from './proxy'

export function filterProxies(config:Config) {
	let proxies:Array<Proxy.BaseProxy> = config.proxies
	Config.Groups.forEach(g => {
		if (g.keywords!=null)
		{
			let keywords = g.keywords.split(' ');
			let fProxies:Array<Proxy.BaseProxy> = proxies;
			keywords.forEach(k => {
				fProxies = fProxies.filter(proxy => proxy.name.includes(k));
			});
			if (!config.filteredProxies.has(g.keywords))
				config.filteredProxies.set(g.keywords, fProxies);
		}
	});
}