import { Config } from "./configs";
import * as Proxy from './proxy'

export function filterProxies(proxies:Array<Proxy.BaseProxy>) {
	Config.Groups.forEach(g => {
		if (g.keywords!=null)
		{
			let keywords = g.keywords.split(' ');
			let fProxies:Array<Proxy.BaseProxy> = proxies;
			keywords.forEach(k => {
				fProxies = fProxies.filter(proxy => proxy.name.includes(k));
			});
			if (!Config.filteredProxies.has(g.keywords))
				Config.filteredProxies.set(g.keywords, fProxies);
		}
	});
}