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
exports.fillRules = exports.fillProxies = exports.fillGroup = exports.parseRulePayload = exports.parseSingleRule = exports.parseProxyGroups = exports.parseProxies = void 0;
var configs_1 = require("./configs");
var Proxy = __importStar(require("./proxy"));
var Rule = __importStar(require("./rule"));
function parseProxies(proxies) {
    var rst = proxies
        .map(function (item) {
        var p;
        switch (item.type) {
            case 'vmess':
                p = new Proxy.Vmess(item);
                break;
            case 'ss':
                p = new Proxy.Shadowsocks(item);
                break;
            case 'socks5':
                p = new Proxy.Socks5(item);
                break;
            case 'http':
                p = new Proxy.Http(item);
                break;
            case 'trojan':
                p = new Proxy.Trojan(item);
                break;
            default:
                p = new Proxy.BaseProxy(item);
                break;
        }
        return p;
    });
    return rst;
}
exports.parseProxies = parseProxies;
function parseProxyGroups(proxyGroups) {
    var rst = proxyGroups
        .map(function (item) {
        var p;
        switch (item.type) {
            case 'select':
                p = new Proxy.SelectProxyGroup(item);
                break;
            case 'urltest':
                p = new Proxy.UrlTestProxyGroup(item);
                break;
            default:
                p = new Proxy.SelectProxyGroup(item);
                break;
        }
        return p;
    });
    return rst;
}
exports.parseProxyGroups = parseProxyGroups;
function parseSingleRule(payload) {
    var str = payload.split(',');
    return new Rule.SingleRule(new Rule.PayloadRule(payload), str[2]);
}
exports.parseSingleRule = parseSingleRule;
function parseRulePayload(payload) {
    return payload.map(function (p) { return new Rule.PayloadRule(p); });
}
exports.parseRulePayload = parseRulePayload;
function fillGroup(config, input) {
    input.forEach(function (g) {
        config.OutConfig.proxyGroups.push(g.getRaw());
    });
}
exports.fillGroup = fillGroup;
function fillProxies(config) {
    config.proxies.map(function (p) { return p.raw; })
        .forEach(function (item) {
        config.OutConfig.proxies.push(item);
    });
}
exports.fillProxies = fillProxies;
function fillRules(config) {
    config.rules.map(function (r) { return r.payload.type + ',' + r.payload.content + ',' + r.strategy; })
        .forEach(function (item) {
        config.OutConfig.rules.push(item);
    });
    config.OutConfig.rules.push('MATCH,' + configs_1.Config.final);
}
exports.fillRules = fillRules;
