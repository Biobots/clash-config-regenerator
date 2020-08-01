"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trojan = exports.Http = exports.Socks5 = exports.Shadowsocks = exports.Vmess = exports.BaseProxy = exports.UrlTestProxyGroup = exports.SelectProxyGroup = exports.BaseProxyGroup = exports.ProxyGroupType = exports.ProxyType = void 0;
var ProxyType;
(function (ProxyType) {
    ProxyType[ProxyType["Base"] = 0] = "Base";
    ProxyType[ProxyType["Vmess"] = 1] = "Vmess";
    ProxyType[ProxyType["Shadowsocks"] = 2] = "Shadowsocks";
    ProxyType[ProxyType["Socks5"] = 3] = "Socks5";
    ProxyType[ProxyType["Http"] = 4] = "Http";
    ProxyType[ProxyType["Snell"] = 5] = "Snell";
    ProxyType[ProxyType["Trojan"] = 6] = "Trojan";
    ProxyType[ProxyType["ShadowsocksR"] = 7] = "ShadowsocksR";
})(ProxyType = exports.ProxyType || (exports.ProxyType = {}));
var ProxyGroupType;
(function (ProxyGroupType) {
    ProxyGroupType[ProxyGroupType["Base"] = 0] = "Base";
    ProxyGroupType[ProxyGroupType["Select"] = 1] = "Select";
    ProxyGroupType[ProxyGroupType["UrlTest"] = 2] = "UrlTest";
})(ProxyGroupType = exports.ProxyGroupType || (exports.ProxyGroupType = {}));
var BaseProxyGroup = /** @class */ (function () {
    function BaseProxyGroup(raw) {
        this.subgroup = [];
        this.raw = raw;
        this.name = raw.name;
        this.keywords = raw.keywords;
        this.type = ProxyGroupType.Base;
        this.proxies = [];
        if (typeof (raw.subgroup) != 'undefined')
            this.subgroup = raw.subgroup;
    }
    return BaseProxyGroup;
}());
exports.BaseProxyGroup = BaseProxyGroup;
var SelectProxyGroup = /** @class */ (function (_super) {
    __extends(SelectProxyGroup, _super);
    function SelectProxyGroup(raw) {
        var _this = _super.call(this, raw) || this;
        _this.type = ProxyGroupType.Select;
        return _this;
    }
    SelectProxyGroup.prototype.getRaw = function () {
        return {
            name: this.name,
            type: 'select',
            proxies: this.subgroup.concat(this.proxies.map(function (p) { return p.name; }))
        };
    };
    return SelectProxyGroup;
}(BaseProxyGroup));
exports.SelectProxyGroup = SelectProxyGroup;
var UrlTestProxyGroup = /** @class */ (function (_super) {
    __extends(UrlTestProxyGroup, _super);
    function UrlTestProxyGroup(raw) {
        var _this = _super.call(this, raw) || this;
        _this.type = ProxyGroupType.UrlTest;
        _this.url = raw.url;
        _this.interval = raw.interval;
        return _this;
    }
    UrlTestProxyGroup.prototype.getRaw = function () {
        return {
            name: this.name,
            type: 'url-test',
            url: this.url,
            interval: this.interval,
            proxies: this.subgroup.concat(this.proxies.map(function (p) { return p.name; }))
        };
    };
    return UrlTestProxyGroup;
}(BaseProxyGroup));
exports.UrlTestProxyGroup = UrlTestProxyGroup;
var BaseProxy = /** @class */ (function () {
    function BaseProxy(raw) {
        this.name = raw.name;
        this.raw = raw;
        this.type = ProxyType.Base;
    }
    return BaseProxy;
}());
exports.BaseProxy = BaseProxy;
var Vmess = /** @class */ (function (_super) {
    __extends(Vmess, _super);
    function Vmess(raw) {
        var _this = _super.call(this, raw) || this;
        _this.server = '';
        _this.port = 0;
        _this.uuid = '';
        _this.alterId = 0;
        _this.cipher = '';
        _this.udp = undefined;
        _this.tls = undefined;
        _this.skipCertVerify = undefined;
        _this.network = undefined;
        _this.wsPath = undefined;
        _this.type = ProxyType.Vmess;
        _this.server = raw.server;
        _this.port = raw.port;
        _this.uuid = raw.uuid;
        _this.alterId = raw.alterId;
        _this.cipher = raw.cipher;
        _this.udp = raw.udp;
        _this.tls = raw.tls;
        _this.skipCertVerify = raw.skipCertVerify;
        _this.network = raw.network;
        _this.wsPath = raw.wsPath;
        return _this;
    }
    return Vmess;
}(BaseProxy));
exports.Vmess = Vmess;
var Shadowsocks = /** @class */ (function (_super) {
    __extends(Shadowsocks, _super);
    function Shadowsocks(raw) {
        var _this = _super.call(this, raw) || this;
        _this.server = '';
        _this.port = 0;
        _this.password = '';
        _this.cipher = '';
        _this.udp = undefined;
        _this.type = ProxyType.Shadowsocks;
        _this.server = raw.server;
        _this.port = raw.port;
        _this.password = raw.password;
        _this.cipher = raw.cipher;
        _this.udp = raw.udp;
        return _this;
    }
    return Shadowsocks;
}(BaseProxy));
exports.Shadowsocks = Shadowsocks;
var Socks5 = /** @class */ (function (_super) {
    __extends(Socks5, _super);
    function Socks5(raw) {
        var _this = _super.call(this, raw) || this;
        _this.server = '';
        _this.port = 0;
        _this.username = undefined;
        _this.password = undefined;
        _this.tls = undefined;
        _this.skipCertVerify = undefined;
        _this.udp = undefined;
        _this.type = ProxyType.Socks5;
        _this.server = raw.server;
        _this.port = raw.port;
        _this.username = raw.username;
        _this.password = raw.password;
        _this.tls = raw.tls;
        _this.skipCertVerify = raw.skipCertVerify;
        _this.udp = raw.udp;
        return _this;
    }
    return Socks5;
}(BaseProxy));
exports.Socks5 = Socks5;
var Http = /** @class */ (function (_super) {
    __extends(Http, _super);
    function Http(raw) {
        var _this = _super.call(this, raw) || this;
        _this.server = '';
        _this.port = 0;
        _this.username = undefined;
        _this.password = undefined;
        _this.tls = undefined;
        _this.skipCertVerify = undefined;
        _this.udp = undefined;
        _this.type = ProxyType.Http;
        _this.server = raw.server;
        _this.port = raw.port;
        _this.username = raw.username;
        _this.password = raw.password;
        _this.tls = raw.tls;
        _this.skipCertVerify = raw.skipCertVerify;
        _this.udp = raw.udp;
        return _this;
    }
    return Http;
}(BaseProxy));
exports.Http = Http;
var Trojan = /** @class */ (function (_super) {
    __extends(Trojan, _super);
    function Trojan(raw) {
        var _this = _super.call(this, raw) || this;
        _this.server = '';
        _this.port = 0;
        _this.password = '';
        _this.sni = undefined;
        _this.skipCertVerify = undefined;
        _this.udp = undefined;
        _this.type = ProxyType.Trojan;
        _this.server = raw.server;
        _this.port = raw.port;
        _this.password = raw.password;
        _this.sni = raw.sni;
        _this.skipCertVerify = raw.skipCertVerify;
        _this.udp = raw.udp;
        return _this;
    }
    return Trojan;
}(BaseProxy));
exports.Trojan = Trojan;
