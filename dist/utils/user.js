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
exports.getUser = exports.User = void 0;
var yaml = require("js-yaml");
var fs = require("fs");
var path = require("path");
var global_1 = require("./global");
var Parser = __importStar(require("./parser"));
var User = /** @class */ (function () {
    function User(id) {
        this.header = '';
        this.proxies = [];
        this.rules = [];
        this.groups = [];
        this.doc = {
            proxies: [],
            proxyGroups: [],
            rules: []
        };
        try {
            this.config = yaml.safeLoad(fs.readFileSync(path.join(global_1.Config.configDir, id + '.yml'), 'utf-8'));
            this.header = fs.readFileSync(this.config.header, 'utf-8');
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
    User.prototype.buildProxyGroups = function () {
        var _this = this;
        this.groups = Parser.parseProxyGroups(this.config.groups);
        this.groups.forEach(function (g) {
            if (g.keywords != null) {
                var keywords = g.keywords.map(function (k) { return k.split(' '); });
                g.proxies = Parser.filterProxy(keywords, _this.proxies);
            }
        });
    };
    User.prototype.generateDoc = function () {
        this.generateProxies();
        this.generateRules();
        this.generateGroups();
    };
    User.prototype.generateProxies = function () {
        var _this = this;
        this.proxies.forEach(function (item) {
            _this.doc.proxies.push(item.raw);
        });
    };
    User.prototype.generateRules = function () {
        var _this = this;
        this.rules.sort(function (a, b) { return a.prior - b.prior; })
            .map(function (r) { return r.getRaw(); })
            .forEach(function (s) { return s.forEach(function (ss) { return _this.doc.rules.push(ss); }); });
        this.doc.rules.push('MATCH,' + this.config.final);
    };
    User.prototype.generateGroups = function () {
        var _this = this;
        this.groups.forEach(function (item) {
            _this.doc.proxyGroups.push(item.getRaw());
        });
    };
    return User;
}());
exports.User = User;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var usr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usr = new User(id);
                    return [4 /*yield*/, Parser.buildProxies(usr)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Parser.buildRuleGroups(usr)];
                case 2:
                    _a.sent();
                    usr.buildProxyGroups();
                    return [2 /*return*/, usr];
            }
        });
    });
}
exports.getUser = getUser;
