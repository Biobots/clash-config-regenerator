"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGroup = exports.generateRuleByPayload = exports.adaptRules = exports.adaptRule = void 0;
var configs_1 = require("./configs");
var Rule = __importStar(require("./rule"));
function adaptRule(payload, strategy) {
    return new Rule.SingleRule(payload, strategy);
}
exports.adaptRule = adaptRule;
function adaptRules(payload, strategy) {
    if (typeof (payload) == 'undefined')
        return [];
    else
        return payload.map(function (p) { return new Rule.SingleRule(p, strategy); });
}
exports.adaptRules = adaptRules;
function generateRuleByPayload() {
    configs_1.Config.rulepayloads.forEach(function (rules, name) {
        if (configs_1.Config.Groups.findIndex(function (g) { return g.name === name; }) > -1) {
            configs_1.Config.rules = configs_1.Config.rules.concat(adaptRules(rules, name));
        }
    });
}
exports.generateRuleByPayload = generateRuleByPayload;
function processGroup(input) {
    input.forEach(function (i) {
        var proxies = configs_1.Config.filteredProxies.get(i.keywords);
        if (typeof (proxies) != 'undefined') {
            proxies.forEach(function (p) { return i.proxies.push(p); });
            configs_1.Config.filteredProxies.set(i.keywords, proxies);
        }
    });
}
exports.processGroup = processGroup;
