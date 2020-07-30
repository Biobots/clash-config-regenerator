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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillRules = exports.fillProxies = exports.fillGroup = exports.processGroup = exports.processRule = exports.adaptRules = exports.adaptRule = exports.filterProxies = exports.testFilterProxies = exports.filterBySrcLoc = exports.filterByDstLoc = exports.parseRulePayload = exports.parseSingleRule = exports.parseProxyGroups = exports.parseProxies = exports.getRulePayload = exports.getSinglePaylaod = exports.getProxies = void 0;
var configs_1 = require("./configs");
var axios_1 = __importDefault(require("axios"));
var yaml = require("js-yaml");
var Proxy = __importStar(require("./proxy"));
var Rule = __importStar(require("./rule"));
function getProxies() {
    return __awaiter(this, void 0, void 0, function () {
        var promises, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    configs_1.Config.proxyurl.forEach(function (url) { return promises.push(axios_1.default.get(url)); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    res = _a.sent();
                    configs_1.Config.proxies = res.map(function (item) { return item.data; })
                        .map(function (doc) { return yaml.safeLoad(doc); })
                        .map(function (obj) { return obj.proxies; })
                        .map(function (raw) { return parseProxies(raw); })
                        .reduce(function (all, cur) { return all.concat(cur); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProxies = getProxies;
function getSinglePaylaod(url, name) {
    var promise = axios_1.default.get(url);
    return promise.then(function (res) { return configs_1.Config.rulepayloads.set(name, parseRulePayload(yaml.safeLoad(res.data).payload)); });
}
exports.getSinglePaylaod = getSinglePaylaod;
function getRulePayload() {
    return __awaiter(this, void 0, void 0, function () {
        var promises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    configs_1.Config.ruleurl.forEach(function (url, name) { return promises.push(getSinglePaylaod(url, name)); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getRulePayload = getRulePayload;
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
                p = new Proxy.BaseProxyGroup(item);
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
function filterByDstLoc(proxies, key) {
    return proxies.filter(function (proxy) { return typeof (proxy.dstLoc) == undefined ? false : proxy.dstLoc === key; });
}
exports.filterByDstLoc = filterByDstLoc;
function filterBySrcLoc(proxies, key) {
    return proxies.filter(function (proxy) { return typeof (proxy.srcLoc) == undefined ? false : proxy.srcLoc === key; });
}
exports.filterBySrcLoc = filterBySrcLoc;
function testFilterProxies(proxies) {
    configs_1.Config.DstLoc.forEach(function (key) {
        configs_1.Config.filteredProxies.set(key, filterByDstLoc(proxies, key));
    });
}
exports.testFilterProxies = testFilterProxies;
function filterProxies(proxies) {
    configs_1.Config.Groups.forEach(function (g) {
        var keywords = g.keywords.split(' ');
        var fProxies = proxies;
        keywords.forEach(function (k) {
            fProxies = fProxies.filter(function (proxy) { return proxy.name.includes(k); });
        });
        configs_1.Config.filteredProxies.set(g.keywords, fProxies);
    });
}
exports.filterProxies = filterProxies;
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
function processRule() {
    configs_1.Config.rulepayloads.forEach(function (rules, name) {
        if (configs_1.Config.Groups.findIndex(function (g) { return g.name === name; }) > -1) {
            configs_1.Config.rules = configs_1.Config.rules.concat(adaptRules(rules, name));
        }
    });
}
exports.processRule = processRule;
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
function fillGroup(input) {
    input.forEach(function (g) {
        var t = { name: '', type: '', proxies: [] };
        t.name = g.name;
        switch (g.type) {
            case Proxy.ProxyGroupType.Select:
                t.type = 'select';
                break;
            case Proxy.ProxyGroupType.UrlTest:
                t.type = 'url-test';
                t.url = g.url;
                t.interval = g.interval;
                break;
            default:
                t.type = ' ';
                break;
        }
        t.proxies = g.proxies.map(function (p) { return p.name; });
        if (g.direct)
            t.proxies.push('DIRECT');
        if (g.reject)
            t.proxies.push('REJECT');
        configs_1.Config.OutConfig.proxyGroups.push(t);
    });
}
exports.fillGroup = fillGroup;
function fillProxies(input) {
    input.map(function (p) { return p.raw; })
        .forEach(function (item) {
        configs_1.Config.OutConfig.proxies.push(item);
    });
}
exports.fillProxies = fillProxies;
function fillRules(input) {
    input.map(function (r) { return r.payload.type + ',' + r.payload.content + ',' + r.strategy; })
        .forEach(function (item) {
        configs_1.Config.OutConfig.rules.push(item);
    });
}
exports.fillRules = fillRules;
