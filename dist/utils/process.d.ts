import * as Proxy from './proxy';
import * as Rule from './rule';
export declare function adaptRule(payload: Rule.PayloadRule, strategy: string): Rule.SingleRule;
export declare function adaptRules(payload: Array<Rule.PayloadRule> | undefined, strategy: string): Array<Rule.SingleRule>;
export declare function generateRuleByPayload(): void;
export declare function processGroup(input: Array<Proxy.BaseProxyGroup>): void;
