# Clash Config Regenerator

## Only generates `proxies`, `proxy-groups` and `rules`, other options should be defined in `header.yml`!

## Usage

```bash
git clone git@github.com:Biobots/clash-config-regenerator.git
```

Modify `config.yml` and `header.yml`. `src` and `dst` in `config_sample.yml` are now useless.

```bash
yarn start
```

or

```bash
npm start
```

`http://localhost:1234` should return your config file.
