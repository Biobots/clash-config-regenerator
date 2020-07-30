"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleRule = exports.PayloadRule = void 0;
var PayloadRule = /** @class */ (function () {
    function PayloadRule(raw) {
        var str = raw.split(',');
        this.type = str[0];
        this.content = str[1];
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
