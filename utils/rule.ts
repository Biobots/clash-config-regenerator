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
    type:string
    content:string
    strategy:string

    constructor(type:string, content:string, strategy:string) {
        this.type = type;
        this.content = content;
        this.strategy = strategy;
    }
}