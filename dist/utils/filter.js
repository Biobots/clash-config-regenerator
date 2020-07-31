"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProxies = void 0;
var configs_1 = require("./configs");
function filterProxies(proxies) {
    configs_1.Config.Groups.forEach(function (g) {
        var keywords = g.keywords.split(' ');
        var fProxies = proxies;
        keywords.forEach(function (k) {
            fProxies = fProxies.filter(function (proxy) { return proxy.name.includes(k); });
        });
        if (!configs_1.Config.filteredProxies.has(g.keywords))
            configs_1.Config.filteredProxies.set(g.keywords, fProxies);
    });
}
exports.filterProxies = filterProxies;
