"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServ = exports.startServ = void 0;
var express = require("express");
var global_1 = require("./utils/global");
var app = express();
var server;
global_1.Config.load();
app.use('/clash', require('./routes/clash'));
function startServ() {
    server = app.listen(global_1.Config.port, function () {
        console.log('running at ' + global_1.Config.port);
    });
}
exports.startServ = startServ;
function stopServ() {
    server.close(function (err) { console.log(err); process.exit(1); });
    console.log('stopped');
    process.exit(0);
}
exports.stopServ = stopServ;
module.exports.start = startServ;
module.exports.stop = stopServ;
