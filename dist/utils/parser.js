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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpFile = exports.filterProxy = exports.buildRuleGroups = exports.buildProxies = exports.parseProxyGroups = exports.parseProxies = void 0;
var yaml = require("js-yaml");
var Proxy = __importStar(require("./proxy"));
var Net = __importStar(require("./network"));
var rule_1 = require("./rule");
function parseProxies(proxies) {
    if (typeof (proxies) == 'undefined' || proxies == null)
        return [];
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
function buildProxies(usr) {
    return __awaiter(this, void 0, void 0, function () {
        var rst;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Net.getUrls(usr.config.sub)];
                case 1:
                    rst = _a.sent();
                    usr.proxies = rst.map(function (item) { return item.data; })
                        .map(function (doc) { return yaml.safeLoad(doc); })
                        .map(function (obj) { return obj.proxies; })
                        .map(function (raw) { return parseProxies(raw); })
                        .reduce(function (all, cur) { return all.concat(cur); });
                    usr.proxies = usr.proxies.concat(parseProxies(usr.config.proxy));
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildProxies = buildProxies;
function buildRuleGroups(usr) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = usr;
                    return [4 /*yield*/, Promise.all(usr.config.rule.map(function (r) { return __awaiter(_this, void 0, void 0, function () {
                            var payload, rst;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payload = [];
                                        if (!!(typeof (r.url) == 'undefined' || r.url == null)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Net.getUrls(r.url)];
                                    case 1:
                                        rst = _a.sent();
                                        payload = rst.map(function (item) { return item.data; })
                                            .map(function (doc) { return yaml.safeLoad(doc); })
                                            .map(function (obj) { return obj.payload; })
                                            .map(function (raw) { return raw.map(function (s) { return new rule_1.Rule(s); }); })
                                            .reduce(function (all, cur) { return all.concat(cur); });
                                        _a.label = 2;
                                    case 2:
                                        if (!(typeof (r.extra) == 'undefined' || r.extra == null)) {
                                            payload = payload.concat(r.extra.map(function (record) { return new rule_1.Rule(record); }));
                                        }
                                        return [2 /*return*/, new rule_1.RuleGroup(r.name, r.prior, payload)];
                                }
                            });
                        }); }))];
                case 1:
                    _a.rules = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildRuleGroups = buildRuleGroups;
function filterProxy(keys, proxies) {
    var output = proxies;
    output = output.filter(function (proxy) { return keys.every(function (k) { return k.some(function (kk) { return proxy.name.includes(kk); }); }); });
    return output;
}
exports.filterProxy = filterProxy;
function dumpFile(usr) {
    var str = usr.header + '\n';
    str += yaml.safeDump(usr.doc);
    str = str.replace('proxyGroups', 'proxy-groups');
    return str;
}
exports.dumpFile = dumpFile;
