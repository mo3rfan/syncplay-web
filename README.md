# syncplay-web 
[![wercker status](https://app.wercker.com/status/28a680866a256df3a4f591ae06f23a4c/m/ "wercker status")](https://app.wercker.com/project/byKey/28a680866a256df3a4f591ae06f23a4c)

[![Join the chat at https://gitter.im/PowerInside/syncplay-web](https://badges.gitter.im/PowerInside/syncplay-web.svg)](https://gitter.im/PowerInside/syncplay-web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Web port of the [syncplay protocol](http://syncplay.pl/about/protocol/). (Client side only)

Talks with [syncplay](http://syncplay.pl) server running on TCP/IP using a [WebSockets bridge](https://github.com/kanaka/websockify).

## Quick start

1. Run the syncplay server on locally. eg, `./syncplayServer --port 8995 --isolate-rooms`
2. Run a [websockets bridge](https://github.com/kanaka/websockify). like `./run localhost:9000 localhost:8995`
3. Run multiple instances of index.html from your browser.
4. Read the index.html source for usage details.

## Compiling manually

1. `npm install` to install devDependencies like [flow](https://flowtype.org/), babel plugins etc
2. Optional: `npm run-script flow` to check for type errors. (src/syncplay.js)
3. `npm start` to generate js file in `./build` folder. (By default it will build development version; do `BABEL_ENV=production npm start` for a release build)
