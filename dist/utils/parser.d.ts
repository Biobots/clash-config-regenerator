import * as Proxy from './proxy';
import { User } from './user';
export declare function parseProxies(proxies: Array<any>): Array<Proxy.BaseProxy>;
export declare function parseProxyGroups(proxyGroups: Array<any>): Array<Proxy.BaseProxyGroup>;
export declare function buildProxies(usr: User): Promise<void>;
export declare function buildRuleGroups(usr: User): Promise<void>;
export declare function filterProxy(keys: string[], proxies: Proxy.BaseProxy[]): Proxy.BaseProxy[];
export declare function dumpFile(usr: User): string;
