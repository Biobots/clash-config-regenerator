"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleRule = exports.PayloadRule = void 0;
var PayloadRule = /** @class */ (function () {
    function PayloadRule(raw) {
        var str = raw.split(',');
        if (str.length > 2) {
            this.prefix = str[0] + ',' + str[1];
            this.suffix = str[2];
            this.option = true;
            this.raw = raw;
        }
        else if (str.length < 2) {
            this.prefix = 'IP-CIDR,' + str[0];
            this.raw = this.prefix;
            this.suffix = '';
            this.option = false;
        }
        else {
            this.prefix = raw;
            this.suffix = '';
            this.option = false;
            this.raw = raw;
        }
    }
    return PayloadRule;
}());
exports.PayloadRule = PayloadRule;
var SingleRule = /** @class */ (function () {
    function SingleRule(payload, strategy) {
        this.payload = payload;
        this.strategy = strategy;
    }
    return SingleRule;
}());
exports.SingleRule = SingleRule;
