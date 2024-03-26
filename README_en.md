# Putong Online Judge v2

> (For version 1, please visit [here](https://github.com/acm309/PutongOJ/tree/v1))

[![Build Status](https://img.shields.io/github/workflow/status/acm309/PutongOJ/Node.js%20CI?style=flat-square)](https://github.com/acm309/PutongOJ/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/acm309/PutongOJ.svg?style=flat-square)](https://codecov.io/gh/acm309/PutongOJ)
[![Node](https://img.shields.io/badge/node-%3E=9.0.0-ff69b4.svg?style=flat-square)](https://nodejs.org/en/download/releases/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

### Preview

[Demo](http://acm.cjlu.edu.cn) (Test Account: 123456 / 123456)

## Documentation

Currently Not available

## Features

- Built on Docker -- One click Deployment
- Single Page Application -- Better User Experience
- Support multiple cases of test data
- Powered by Vue.js, Koa.js, MongoDB, Redis

## Delpoyment

Note: This project is still during `BETA` stage

### Docker

1. clone this project

```bash
git clone https://github.com/acm309/PutongOJ.git PutongOJ
```

2. compose up

```bash
docker-compose up
```

or

daemon mode
```bash
docker-compose up -d
```

It will listen on 80 ports after it is successfully deployed. Then you can directly visit this platform.

Enjoy it!

### Manual Installation

Ubuntu is recommended. You can deploy this platform on other linux, but I can't ensure it must work.

1. install [Node.js](https://nodejs.org) [mongodb](https://www.mongodb.com/download-center?jmp=nav#community) && [redis](https://redis.io/)

2. install some system dependencies (for ubuntu)

```bash
apt-get install libcairo2-dev libpango1.0-dev build-essential
```

3. clone this repo

```bash
git clone https://github.com/acm309/PutongOJ.git
```

4. install project dependencies

```bash
npm i -g pnpm
pnpm i
```

5. setup database connections

export variables

```bash
export redisURL='your redis url'
export dbURL='your mongodb url'
```

update `config/index.js`

```js
const prod = {
  port: 3000 // the port the application will listen on
}
```

6. setup static files and judger

```bash
node manager.js
```

`pm2.config.json` would be generated.

7. start

install pm2 first

```bash
npm i -g pm2
```

then start with pm2

```bash
pm2 start pm2.config.json
```

## Migration

Know the `Container Id` of the mongodb container by running:

```bash
docker ps
```

### dump

Replace `<Container id>` with the real id of your running mongodb container

```bash
docker exec -it <Container id> mongodump --out /data/backup --db oj
```

The output data will be stored at `migrations/backup/`

### restore

```bash
docker exec -it <Container Id> mongorestore --db oj --drop /data/backup/oj
```

### static files

copy files to `public` folder

Replace `<Container id>` with the real id of your running oj container

```bash
docker cp <SRC_PATH> <Container Id>:/app/public
```

## Browser Support

- IE: **NOT** recommended
- Chrome: 50 or above is recommended
- Firefox: 50 or above is recommended
- Edge: recommended

## LICENSE

[MIT](https://github.com/acm309/PutongOJ/blob/master/LICENSE)
