"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var yaml = require("js-yaml");
var fs = require("fs");
var parsers_1 = require("./parsers");
var Config = /** @class */ (function () {
    function Config() {
        this.proxies = [];
        this.filteredProxies = new Map();
        this.rules = [];
        this.rulepayloads = new Map();
        this.rawStr = fs.readFileSync('header.yml', 'utf-8') + '\n';
        this.OutConfig = {
            proxies: [],
            proxyGroups: [],
            rules: []
        };
    }
    Config.load = function (path) {
        try {
            var configfile = yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
            //server config
            Config.port = configfile.generatorConfig.port;
            Config.final = configfile.generatorConfig.final;
            //generator config
            Config.proxyurl = configfile.proxy;
            configfile.rule.forEach(function (r) {
                Config.ruleurl.set(r.name, r.url);
            });
            Config.Groups = parsers_1.parseProxyGroups(configfile.groups);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    };
    Config.port = 1234;
    Config.proxyurl = [];
    Config.ruleurl = new Map();
    Config.Groups = [];
    return Config;
}());
exports.Config = Config;
