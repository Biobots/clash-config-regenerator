"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var yaml = require("js-yaml");
var fs = require("fs");
var parsers_1 = require("./parsers");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.load = function (path) {
        var configfile = yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
        Config.proxyurl = configfile.proxy;
        configfile.rule.forEach(function (r) {
            Config.ruleurl.set(r.name, r.url);
        });
        Config.DstLoc = configfile.dst;
        Config.SrcLoc = configfile.src;
        Config.Groups = parsers_1.parseProxyGroups(configfile.groups);
        this.rawStr = fs.readFileSync('header.yml', 'utf-8') + '\n';
    };
    Config.proxyurl = [];
    Config.ruleurl = new Map();
    Config.DstLoc = [];
    Config.SrcLoc = [];
    Config.Groups = [];
    Config.proxies = [];
    Config.filteredProxies = new Map();
    Config.rules = [];
    Config.rulepayloads = new Map();
    Config.rawStr = '';
    Config.OutConfig = {
        proxies: [],
        proxyGroups: [],
        rules: []
    };
    return Config;
}());
exports.Config = Config;
