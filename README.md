# SyncPlay-js-client [![Build Status](https://drone.io/github.com/PowerInside/syncplay-web/status.png)](https://drone.io/github.com/PowerInside/syncplay-web/latest)

[![Join the chat at https://gitter.im/PowerInside/syncplay-web](https://badges.gitter.im/PowerInside/syncplay-web.svg)](https://gitter.im/PowerInside/syncplay-web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Web port of the [syncplay protocol](http://syncplay.pl/about/protocol/).

Talks with [syncplay](http://syncplay.pl) server running on TCP/IP using a WebSockets bridge.

## Quick start

1. Run the syncplay server on locally. eg, `./syncplayServer --port 8995 --isolate-rooms`
2. Run a [websockets bridge](https://github.com/kanaka/websockify). like `./run localhost:9000 localhost:8995`
3. Run multiple instances of demo.html from your browser.
4. Read the demo.html source for usage details.

## Compiling manually

1. `npm install` to install devDependencies like [flow](https://flowtype.org/), babel plugins etc
2. `npm run-script flow` to check for type errors. (src/syncplay.js)
3. `BABEL_ENV=prod babel --watch=./src --out-dir=./build` to generate js file in build folder (replace the env var "prod" with "dev" for retaining console.log messages etc)
