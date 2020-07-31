export declare class PayloadRule {
    prefix: string;
    suffix: string;
    raw: any;
    option: boolean;
    constructor(raw: string);
}
export declare class SingleRule {
    payload: PayloadRule;
    strategy: string;
    constructor(payload: PayloadRule, strategy: string);
}
