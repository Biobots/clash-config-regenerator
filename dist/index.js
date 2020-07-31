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
var express = require("express");
var yaml = require("js-yaml");
var fs = require("fs");
var mime = require("mime");
var configs_1 = require("./utils/configs");
var Parser = __importStar(require("./utils/parsers"));
var Net = __importStar(require("./utils/network"));
var Filter = __importStar(require("./utils/filter"));
var Process = __importStar(require("./utils/process"));
var app = express();
app.get('/', function (req, res) {
    var config = new configs_1.Config();
    Promise.all([
        Net.getRulePayload(config),
        Net.getProxies(config)
    ])
        .finally(function () {
        Process.generateRuleByPayload(config);
        Filter.filterProxies(config);
        Process.processGroup(config, configs_1.Config.Groups);
        Parser.fillGroup(config, configs_1.Config.Groups);
        Parser.fillProxies(config);
        Parser.fillRules(config);
        config.rawStr += yaml.safeDump(config.OutConfig);
        config.rawStr = config.rawStr.replace('proxyGroups', 'proxy-groups');
        fs.writeFileSync('out.yml', config.rawStr, 'utf-8');
        res.writeHead(200, { 'Content-type': mime.getType('out.yml'), "Content-Disposition": 'attachment; filename=out.yml' });
        fs.createReadStream('out.yml').pipe(res);
    });
});
configs_1.Config.load('config.yml');
app.listen(configs_1.Config.port, function () {
    console.log('running at ' + configs_1.Config.port);
});
