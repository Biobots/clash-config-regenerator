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
var app = express();
app.get('/', function (req, res) {
    Promise.all([
        Parser.getRulePayload(),
        Parser.getProxies()
    ])
        .finally(function () {
        Parser.processRule();
        Parser.filterProxies(configs_1.Config.proxies);
        Parser.processGroup(configs_1.Config.Groups);
        Parser.fillGroup(configs_1.Config.Groups);
        Parser.fillProxies(configs_1.Config.proxies);
        Parser.fillRules(configs_1.Config.rules);
        configs_1.Config.rawStr += yaml.safeDump(configs_1.Config.OutConfig);
        configs_1.Config.rawStr = configs_1.Config.rawStr.replace('proxyGroups', 'proxy-groups');
        fs.writeFileSync('out.yml', configs_1.Config.rawStr, 'utf-8');
        res.writeHead(200, { 'Content-type': mime.getType('out.yml'), "Content-Disposition": 'attachment; filename=out.yml' });
        fs.createReadStream('out.yml').pipe(res);
    });
});
app.listen(1234, function () {
    console.log('running');
    configs_1.Config.load('config.yml');
});
