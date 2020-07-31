"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProxies = void 0;
var configs_1 = require("./configs");
function filterProxies(proxies) {
    configs_1.Config.Groups.forEach(function (g) {
        if (g.keywords != null) {
            var keywords = g.keywords.split(' ');
            var fProxies_1 = proxies;
            keywords.forEach(function (k) {
                fProxies_1 = fProxies_1.filter(function (proxy) { return proxy.name.includes(k); });
            });
            if (!configs_1.Config.filteredProxies.has(g.keywords))
                configs_1.Config.filteredProxies.set(g.keywords, fProxies_1);
        }
    });
}
exports.filterProxies = filterProxies;
