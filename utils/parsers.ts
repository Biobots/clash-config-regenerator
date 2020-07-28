import * as Config from './configs'
import * as Proxy from './proxy'
import * as Rule from './rule'

export function parseProxies(proxies:Array<any>): Array<Proxy.BaseProxy> {
    let rst:Array<Proxy.BaseProxy> = proxies
        .map((item) => {
            var p:Proxy.BaseProxy;
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

export function parseSingleRule(payload:string):  Rule.SingleRule {
    let str:Array<string> = payload.split(',');
    return new Rule.SingleRule(str[0], str[1], str[2]);
}

export function filterByDstLoc(proxies:Array<Proxy.BaseProxy>, key:string): Array<Proxy.BaseProxy> {
    return proxies.filter(proxy => typeof(proxy.dstLoc)==undefined?false:proxy.dstLoc===key);
}

export function filterBySrcLoc(proxies:Array<Proxy.BaseProxy>, key:string): Array<Proxy.BaseProxy> {
    return proxies.filter(proxy => typeof(proxy.srcLoc)==undefined?false:proxy.srcLoc===key);
}

export function adaptRule(payload:Rule.PayloadRule, strategy:string): Rule.SingleRule {
    return new Rule.SingleRule(payload.type, payload.content, strategy);
}

export function adaptRules(payload:Array<Rule.PayloadRule>, strategy:string): Array<Rule.SingleRule> {
    return payload.map(p => new Rule.SingleRule(p.type, p.content, strategy));
}