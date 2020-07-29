export class PayloadRule {
	type:string
	content:string

	constructor(raw:string) {
		let str:Array<string> = raw.split(',');
		this.type = str[0];
		this.content = str[1];
	}
}

export class SingleRule {
	payload:PayloadRule
	strategy:string

    constructor(payload:PayloadRule, strategy:string) {
		this.payload = payload
		this.strategy = strategy;
	}
}