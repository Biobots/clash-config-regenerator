import * as Rule from './rule';
export declare function getProxies(): Promise<void>;
export declare function getSinglePaylaod(url: string, name: string): Promise<Map<string, Rule.PayloadRule[]>>;
export declare function getRulePayload(): Promise<void>;
