# Clash Config Regenerator

## Only generates `proxies`, `proxy-groups` and `rules`, other options should be defined in `header.yml`

## Usage

```bash
git clone https://github.com/Biobots/clash-config-regenerator.git
```

Modify `global.yml`, `config_sample.yml` and `header_sample.yml`. Copy your config file to `./config` folder, rename it to your user name.

```bash
yarn install
yarn start
```

or

```bash
npm install
npm start
```

If your config file under `config/` is called `a.yml` and your server port is `1111`, then `http://localhost:1111/clash/a` should return your config file.

Mutiple users are supported.

## Use as a package

Add `global.yml` to `./` and use:

```js
let generator_server = require('clash-config-regenerator')
generator_server()
```

to start the server.