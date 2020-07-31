import {Config} from './configs'

export enum ProxyType {
	Base,
	Vmess,
	Shadowsocks,
	Socks5,
	Http,
	Snell,
	Trojan,
	ShadowsocksR
}

export enum ProxyGroupType {
	Base,
	Select,
	UrlTest
}

export abstract class BaseProxyGroup {
	name:string
	type:ProxyGroupType
	keywords:string
	proxies:Array<BaseProxy>
	direct:boolean
	reject:boolean

	raw:any

	constructor(raw:any) {
		this.raw = raw;
		this.name = raw.name;
		this.keywords = raw.keywords;
		this.type = ProxyGroupType.Base;
		this.proxies = [];
		this.direct = typeof(raw.direct)=='undefined'?false:raw.direct;
		this.reject = typeof(raw.reject)=='undefined'?false:raw.reject;
	}

	abstract getRaw(): any;
}

export class SelectProxyGroup extends BaseProxyGroup {

	constructor(raw:any) {
		super(raw);
		this.type = ProxyGroupType.Select;
	}

	getRaw(): any{
		let ps = this.proxies.map(p => p.name);
		if (this.direct) ps.push('DIRECT');
		if (this.reject) ps.push('REJECT');
		return {
			name:this.name,
			type:'url-test',
			proxies:ps
		};
	}
}

export class UrlTestProxyGroup extends BaseProxyGroup {
	url:string
	interval:number

	constructor(raw:any) {
		super(raw);
		this.type = ProxyGroupType.UrlTest;
		this.url = raw.url;
		this.interval = raw.interval;
	}

	getRaw(): any{
		let ps = this.proxies.map(p => p.name);
		if (this.direct) ps.push('DIRECT');
		if (this.reject) ps.push('REJECT');
		return {
			name:this.name,
			type:'url-test',
			url:this.url,
			interval:this.interval,
			proxies:ps
		};
	}
}

export class BaseProxy {
	name:string
	type:ProxyType

	raw:any

	constructor(raw:any) {
		this.name = raw.name;
		this.raw = raw;
		this.type = ProxyType.Base;
	}
}

export class Vmess extends BaseProxy {
	server:string=''
	port:number=0
	uuid:string=''
	alterId:number=0
	cipher:string=''

	udp:boolean|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	network:string|undefined=undefined
	wsPath:string|undefined=undefined

    constructor(raw:any) {
		super(raw);

		this.type = ProxyType.Vmess;

		this.server = raw.server;
		this.port = raw.port;
		this.uuid = raw.uuid;
		this.alterId = raw.alterId;
		this.cipher = raw.cipher;

		this.udp = raw.udp;
		this.tls = raw.tls;
		this.skipCertVerify = raw.skipCertVerify;
		this.network = raw.network;
		this.wsPath = raw.wsPath;
	}
}

export class Shadowsocks extends BaseProxy {
	server:string=''
	port:number=0
	password:string=''
	cipher:string=''

	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw);

		this.type = ProxyType.Shadowsocks;

		this.server = raw.server;
		this.port = raw.port;
		this.password = raw.password;
		this.cipher = raw.cipher;

		this.udp = raw.udp;
	}
}

export class Socks5 extends BaseProxy {
	server:string=''
	port:number=0

	username:string|undefined=undefined
	password:string|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw);

		this.type = ProxyType.Socks5;

		this.server = raw.server;
		this.port = raw.port;

		this.username = raw.username;
		this.password = raw.password;
		this.tls = raw.tls;
		this.skipCertVerify = raw.skipCertVerify;
		this.udp = raw.udp;
	}
}

export class Http extends BaseProxy {
	server:string=''
	port:number=0

	username:string|undefined=undefined
	password:string|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw);

		this.type = ProxyType.Http;

		this.server = raw.server;
		this.port = raw.port;

		this.username = raw.username;
		this.password = raw.password;
		this.tls = raw.tls;
		this.skipCertVerify = raw.skipCertVerify;
		this.udp = raw.udp;
	}
}

export class Trojan extends BaseProxy {
	server:string=''
	port:number=0
	password:string=''

	sni:string|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw);

		this.type = ProxyType.Trojan;

		this.server = raw.server;
		this.port = raw.port;
		this.password = raw.password;

		this.sni = raw.sni;
		this.skipCertVerify = raw.skipCertVerify;
		this.udp = raw.udp;
	}
}