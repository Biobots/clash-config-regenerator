import { Config } from './configs';
import * as Rule from './rule';
export declare function getProxies(config: Config): Promise<void>;
export declare function getSinglePaylaod(config: Config, url: string, name: string): Promise<Map<string, Rule.PayloadRule[]>>;
export declare function getRulePayload(config: Config): Promise<void>;
