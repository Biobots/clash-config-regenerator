export declare enum ProxyType {
    Base = 0,
    Vmess = 1,
    Shadowsocks = 2,
    Socks5 = 3,
    Http = 4,
    Snell = 5,
    Trojan = 6,
    ShadowsocksR = 7
}
export declare enum ProxyGroupType {
    Base = 0,
    Select = 1,
    UrlTest = 2
}
export declare class BaseProxyGroup {
    name: string;
    type: ProxyGroupType;
    keywords: string;
    proxies: Array<BaseProxy>;
    direct: boolean;
    reject: boolean;
    raw: any;
    constructor(raw: any);
}
export declare class SelectProxyGroup extends BaseProxyGroup {
    constructor(raw: any);
}
export declare class UrlTestProxyGroup extends BaseProxyGroup {
    url: string;
    interval: number;
    constructor(raw: any);
}
export declare class BaseProxy {
    name: string;
    type: ProxyType;
    dstLoc: string | undefined;
    srcLoc: string | undefined;
    raw: any;
    constructor(raw: any);
}
export declare class Vmess extends BaseProxy {
    server: string;
    port: number;
    uuid: string;
    alterId: number;
    cipher: string;
    udp: boolean | undefined;
    tls: boolean | undefined;
    skipCertVerify: boolean | undefined;
    network: string | undefined;
    wsPath: string | undefined;
    constructor(raw: any);
}
export declare class Shadowsocks extends BaseProxy {
    server: string;
    port: number;
    password: string;
    cipher: string;
    udp: boolean | undefined;
    constructor(raw: any);
}
export declare class Socks5 extends BaseProxy {
    server: string;
    port: number;
    username: string | undefined;
    password: string | undefined;
    tls: boolean | undefined;
    skipCertVerify: boolean | undefined;
    udp: boolean | undefined;
    constructor(raw: any);
}
export declare class Http extends BaseProxy {
    server: string;
    port: number;
    username: string | undefined;
    password: string | undefined;
    tls: boolean | undefined;
    skipCertVerify: boolean | undefined;
    udp: boolean | undefined;
    constructor(raw: any);
}
export declare class Trojan extends BaseProxy {
    server: string;
    port: number;
    password: string;
    sni: string | undefined;
    skipCertVerify: boolean | undefined;
    udp: boolean | undefined;
    constructor(raw: any);
}
