import { BaseProxy, BaseProxyGroup } from './proxy';
import { PayloadRule, SingleRule } from './rule';
export declare class Config {
    static port: number;
    static final: string;
    static proxyurl: Array<string>;
    static ruleurl: Map<string, string[]>;
    static Groups: Array<BaseProxyGroup>;
    proxies: Array<BaseProxy>;
    filteredProxies: Map<string, Array<BaseProxy>>;
    rules: Array<SingleRule>;
    rulepayloads: Map<string, PayloadRule[]>;
    rawStr: string;
    OutConfig: any;
    static load(path: string): void;
}
