import yaml = require('js-yaml');
import fs = require('fs');

export class Config {
	static port:number
	static configDir:string
	static outputDir:string

	static load() {
		try {
			let config:any = yaml.safeLoad(fs.readFileSync('global.yml', 'utf-8'));
			this.port = config.port;
			this.configDir = config.configDir;
			this.outputDir = config.outputDir;
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}
}