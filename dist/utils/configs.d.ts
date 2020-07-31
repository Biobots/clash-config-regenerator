import { BaseProxy, BaseProxyGroup } from './proxy';
import { PayloadRule, SingleRule } from './rule';
export declare class Config {
    static port: number;
    static proxyurl: Array<string>;
    static ruleurl: Map<string, string[]>;
    static DstLoc: Array<string>;
    static SrcLoc: Array<string>;
    static Groups: Array<BaseProxyGroup>;
    static proxies: Array<BaseProxy>;
    static filteredProxies: Map<string, Array<BaseProxy>>;
    static rules: Array<SingleRule>;
    static rulepayloads: Map<string, PayloadRule[]>;
    static rawStr: string;
    static OutConfig: any;
    static load(path: string): void;
}
