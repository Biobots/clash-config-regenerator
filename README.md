# Clash Config Regenerator

## Only generates `proxies`, `proxy-groups` and `rules`, other options should be defined in `header.yml`

## Usage

```bash
git clone git@github.com:Biobots/clash-config-regenerator.git
```

Modify `config.yml` and `header.yml`.

```bash
yarn install
yarn start
```

or

```bash
npm install
npm start
```

`http://localhost:xxxx` should return your config file.
