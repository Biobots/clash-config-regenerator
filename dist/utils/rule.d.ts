export declare class Rule {
    prefix: string;
    suffix: string;
    raw: any;
    constructor(raw: string);
    getRaw(strategy: string): string;
}
export declare class RuleGroup {
    name: string;
    prior: number;
    payload: Rule[];
    constructor(name: string, prior: number, payload: Rule[]);
    getRaw(): string[];
}
