import { Config } from "./configs";
import * as Proxy from './proxy';
import * as Rule from './rule';
export declare function adaptRule(payload: Rule.PayloadRule, strategy: string): Rule.SingleRule;
export declare function adaptRules(payload: Array<Rule.PayloadRule> | undefined, strategy: string): Array<Rule.SingleRule>;
export declare function generateRuleByPayload(config: Config): void;
export declare function processGroup(config: Config, input: Array<Proxy.BaseProxyGroup>): void;
