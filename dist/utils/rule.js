"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleGroup = exports.Rule = void 0;
var PayloadType;
(function (PayloadType) {
    PayloadType[PayloadType["Normal"] = 0] = "Normal";
    PayloadType[PayloadType["NoResolve"] = 1] = "NoResolve";
})(PayloadType || (PayloadType = {}));
var Rule = /** @class */ (function () {
    function Rule(raw) {
        var str = raw.split(',');
        if (str.length > 2) {
            this.prefix = str[0] + ',' + str[1];
            this.suffix = str[2];
            this.raw = raw;
        }
        else if (str.length < 2) {
            this.prefix = 'IP-CIDR,' + str[0];
            this.raw = raw;
            this.suffix = '';
        }
        else {
            this.prefix = raw;
            this.suffix = '';
            this.raw = raw;
        }
    }
    Rule.prototype.getRaw = function (strategy) {
        if (this.suffix === '')
            return this.prefix + ',' + strategy;
        else
            return this.prefix + ',' + strategy + ',' + this.suffix;
    };
    return Rule;
}());
exports.Rule = Rule;
var RuleGroup = /** @class */ (function () {
    function RuleGroup(name, prior, payload) {
        this.name = name;
        this.prior = prior;
        this.payload = payload;
    }
    RuleGroup.prototype.getRaw = function () {
        var _this = this;
        return this.payload.map(function (p) { return p.getRaw(_this.name); });
    };
    return RuleGroup;
}());
exports.RuleGroup = RuleGroup;
