import yaml = require('js-yaml');
import fs = require('fs');

export class Config {
	static port:number

	static load() {
		try {
			let config:any = yaml.safeLoad(fs.readFileSync('global.yml', 'utf-8'));
			this.port = config.port;
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}
}