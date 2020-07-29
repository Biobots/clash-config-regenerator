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
	Select
}

export class BaseProxyGroup {
	name:string
	type:ProxyGroupType
	group:string
	proxies:Array<BaseProxy>

	raw:any

	constructor(raw:any) {
		this.raw = raw;
		this.name = raw.name;
		this.group = raw.group;
		this.type = ProxyGroupType.Base;
		this.proxies = [];
	}
}

export class SelectProxyGroup extends BaseProxyGroup {

	constructor(raw:any) {
		super(raw);
		this.type = ProxyGroupType.Select;
	}
}

export class BaseProxy {
	name:string
	type:ProxyType

	dstLoc:string|undefined
	srcLoc:string|undefined

	raw:any

	constructor(raw:any) {
		this.name = raw.name;
		this.raw = raw;
		this.type = ProxyType.Base;
		this.dstLoc = Config.DstLoc.filter(str => this.name.match(str))[0];
		this.srcLoc = Config.SrcLoc.filter(str => this.name.match(str))[0];
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