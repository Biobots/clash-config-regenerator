import * as Proxy from './proxy';
import * as Rule from './rule';
export declare class User {
    header: string;
    config: any;
    proxies: Proxy.BaseProxy[];
    rules: Rule.RuleGroup[];
    groups: Proxy.BaseProxyGroup[];
    doc: any;
    constructor(id: string);
    buildProxyGroups(): void;
    generateDoc(): void;
    generateProxies(): void;
    generateRules(): void;
    generateGroups(): void;
}
export declare function getUser(id: string): Promise<User>;
