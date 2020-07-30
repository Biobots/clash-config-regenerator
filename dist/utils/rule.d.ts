export declare class PayloadRule {
    type: string;
    content: string;
    constructor(raw: string);
}
export declare class SingleRule {
    payload: PayloadRule;
    strategy: string;
    constructor(payload: PayloadRule, strategy: string);
}
