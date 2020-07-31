export class PayloadRule {
	prefix:string
	suffix:string
	raw:any
	option:boolean

	constructor(raw:string) {
		let str:Array<string> = raw.split(',');
		if (str.length > 2) {
			this.prefix = str[0]+','+str[1];
			this.suffix = str[2];
			this.option = true;
			this.raw = raw;
		}
		else if (str.length < 2) {
			this.prefix = 'IP-CIDR,'+str[0];
			this.raw = this.prefix;
			this.suffix = '';
			this.option = false
		}
		else {
			this.prefix = raw;
			this.suffix = '';
			this.option = false
			this.raw = raw;
		}
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