/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = Websock;
var _StringfromCharCode=String.fromCharCode;[module];function Websock(){"use strict";this._websocket=null,this._rQi=0,this._rQlen=0,this._rQbufferSize=4194304,this._rQmax=this._rQbufferSize/8,this._rQ=null,this._sQbufferSize=10240,this._sQlen=0,this._sQ=null,this._eventHandlers={message:function(){},open:function(){},close:function(){},error:function(){}}}(function(){"use strict";var c=41943040,d=function(){try{var f=new Uint8Array([1,2,3]);return _StringfromCharCode.apply(null,f),function(g){return _StringfromCharCode.apply(null,g)}}catch(g){return function(h){return _StringfromCharCode.apply(null,Array.prototype.slice.call(h))}}}();Websock.prototype={get_sQ:function(){return this._sQ},get_rQ:function(){return this._rQ},get_rQi:function(){return this._rQi},set_rQi:function(f){this._rQi=f},rQlen:function(){return this._rQlen-this._rQi},rQpeek8:function(){return this._rQ[this._rQi]},rQshift8:function(){return this._rQ[this._rQi++]},rQskip8:function(){this._rQi++},rQskipBytes:function(f){this._rQi+=f},rQshift16:function(){return(this._rQ[this._rQi++]<<8)+this._rQ[this._rQi++]},rQshift32:function(){return(this._rQ[this._rQi++]<<24)+(this._rQ[this._rQi++]<<16)+(this._rQ[this._rQi++]<<8)+this._rQ[this._rQi++]},rQshiftStr:function(f){"undefined"==typeof f&&(f=this.rQlen());var g=new Uint8Array(this._rQ.buffer,this._rQi,f);return this._rQi+=f,d(g)},rQshiftBytes:function(f){return"undefined"==typeof f&&(f=this.rQlen()),this._rQi+=f,new Uint8Array(this._rQ.buffer,this._rQi-f,f)},rQshiftTo:function(f,g){g===void 0&&(g=this.rQlen()),f.set(new Uint8Array(this._rQ.buffer,this._rQi,g)),this._rQi+=g},rQwhole:function(){return new Uint8Array(this._rQ.buffer,0,this._rQlen)},rQslice:function(f,g){return g?new Uint8Array(this._rQ.buffer,this._rQi+f,g-f):new Uint8Array(this._rQ.buffer,this._rQi+f,this._rQlen-this._rQi-f)},rQwait:function(f,g,h){var i=this._rQlen-this._rQi;if(i<g){if(h){if(this._rQi<h)throw new Error("rQwait cannot backup "+h+" bytes");this._rQi-=h}return!0}return!1},flush:function(){0!==this._websocket.bufferedAmount&&__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug("bufferedAmount: "+this._websocket.bufferedAmount),0<this._sQlen&&this._websocket.readyState===WebSocket.OPEN&&(this._websocket.send(this._encode_message()),this._sQlen=0)},send:function(f){this._sQ.set(f,this._sQlen),this._sQlen+=f.length,this.flush()},send_string:function(f){this.send(f.split("").map(function(g){return g.charCodeAt(0)}))},off:function(f){this._eventHandlers[f]=function(){}},on:function(f,g){this._eventHandlers[f]=g},_allocate_buffers:function(){this._rQ=new Uint8Array(this._rQbufferSize),this._sQ=new Uint8Array(this._sQbufferSize)},init:function(){this._allocate_buffers(),this._rQi=0,this._websocket=null},open:function(f,g){f.match(/^([a-z]+):\/\//)[1];this.init(),this._websocket=new WebSocket(f,g),this._websocket.binaryType="arraybuffer",this._websocket.onmessage=this._recv_message.bind(this),this._websocket.onopen=function(){__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug(">> WebSock.onopen"),this._websocket.protocol&&__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Info("Server choose sub-protocol: "+this._websocket.protocol),this._eventHandlers.open(),__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug("<< WebSock.onopen")}.bind(this),this._websocket.onclose=function(i){__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug(">> WebSock.onclose"),this._eventHandlers.close(i),__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug("<< WebSock.onclose")}.bind(this),this._websocket.onerror=function(i){__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug(">> WebSock.onerror: "+i),this._eventHandlers.error(i),__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug("<< WebSock.onerror: "+i)}.bind(this)},close:function(){this._websocket&&((this._websocket.readyState===WebSocket.OPEN||this._websocket.readyState===WebSocket.CONNECTING)&&(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Info("Closing WebSocket connection"),this._websocket.close()),this._websocket.onmessage=function(){})},_encode_message:function(){return new Uint8Array(this._sQ.buffer,0,this._sQlen)},_expand_compact_rQ:function(f){var g=f||this._rQlen-this._rQi>this._rQbufferSize/2;if(g&&(f?this._rQbufferSize=8*(this._rQlen-this._rQi+f):this._rQbufferSize*=2),this._rQbufferSize>c&&(this._rQbufferSize=c,this._rQbufferSize-this._rQlen-this._rQi<f))throw new Exception("Receive Queue buffer exceeded "+c+" bytes, and the new message could not fit");if(g){var h=this._rQ.buffer;this._rQmax=this._rQbufferSize/8,this._rQ=new Uint8Array(this._rQbufferSize),this._rQ.set(new Uint8Array(h,this._rQi))}else this._rQ.set(new Uint8Array(this._rQ.buffer,this._rQi));this._rQlen-=this._rQi,this._rQi=0},_decode_message:function(f){var g=new Uint8Array(f);g.length>this._rQbufferSize-this._rQlen&&this._expand_compact_rQ(g.length),this._rQ.set(g,this._rQlen),this._rQlen+=g.length},_recv_message:function(f){try{this._decode_message(f.data),0<this.rQlen()?(this._eventHandlers.message(),this._rQlen==this._rQi?(this._rQlen=0,this._rQi=0):this._rQlen>this._rQmax&&this._expand_compact_rQ()):__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Debug("Ignoring empty message")}catch(h){var g="";h.name&&(g+="\n    name: "+h.name+"\n",g+="    message: "+h.message+"\n"),"undefined"!=typeof h.description&&(g+="    description: "+h.description+"\n"),"undefined"!=typeof h.stack&&(g+=h.stack),0<g.length?__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Error("recv_message, caught exception: "+g):__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].Error("recv_message, caught exception: "+h),"undefined"==typeof h.name?this._eventHandlers.error(h):this._eventHandlers.error(h.name+": "+h.message)}}}})();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__websock__ = __webpack_require__(0);
var SyncPlay=function(a,b,c){function e(){w=new __WEBPACK_IMPORTED_MODULE_0__websock__["a" /* default */],w.open('ws://'+v),w.on('open',()=>{l()}),w.on('message',g)}function f(N,O,P,Q,R){var S={};if('undefined'==typeof R)return!1;var U=0==F||0!=G;U&&null!=N&&null!=O&&(S.playstate={},S.playstate.position=N(J),S.playstate.paused=O(J),P&&(S.playstate.doSeek=P,K=!1)),S.ping={},null!=Q&&(S.ping.latencyCalculation=Q),S.ping.clientLatencyCalculation=new Date().getTime()/1e3,S.ping.clientRtt=C,R&&(F+=1),(G||F)&&(S.ignoringOnTheFly={},G&&(S.ignoringOnTheFly.server=G,G=0),F&&(S.ignoringOnTheFly.client=F)),m({State:S})}function g(){for(var Q,N=w.rQshiftStr(),O=N.split('\r\n'),P=0;P<O.length&&''!=O[P];P+=1){if(Q=JSON.parse(O[P]),Q.hasOwnProperty('Hello')&&(x=Q.Hello.motd,k('joined'),y({connected:!0,motd:x})),Q.hasOwnProperty('Error'))throw Q.Error;if(Q.hasOwnProperty('Set')&&Q.Set.hasOwnProperty('user'))for(var R in Q.Set.user){if(Q.Set.user[R].hasOwnProperty('event')){var S=new CustomEvent('userlist',{detail:{user:Object.keys(Q.Set.user)[0],evt:Object.keys(Q.Set.user[R].event)[0]},bubbles:!0,cancelable:!0});D.dispatchEvent(S)}if(Q.Set.user[R].hasOwnProperty('file')&&Object.keys(Q.Set.user)[0]!=s){var S=new CustomEvent('fileupdate',{detail:Q.Set,bubbles:!0,cancelable:!0});D.dispatchEvent(S)}}if(Q.hasOwnProperty('List')){var T=Object.keys(Q.List)[0],S=new CustomEvent('listusers',{detail:Q.List[T],bubbles:!0,cancelable:!0});D.dispatchEvent(S)}if(Q.hasOwnProperty('State')){if(C=Q.State.ping.yourLatency,L=Q.State.ping.latencyCalculation,Q.State.hasOwnProperty('ignoringOnTheFly')){var U=Q.State.ignoringOnTheFly;U.hasOwnProperty('server')?(G=U.server,F=0,M=!1):U.hasOwnProperty('client')&&U.client==F&&(F=0,M=!1)}if(Q.State.playstate.hasOwnProperty('setBy')&&null!=Q.State.playstate.setBy&&Q.State.playstate.setBy!=s){var S=new CustomEvent('userevent',{detail:Q.State.playstate,bubbles:!0,cancelable:!0});M||F||(M=!1,D.dispatchEvent(S))}f(I,H,K,L,M)}}}function h(){var N={Set:{file:{duration:A,name:z,size:B}}};m(N)}function j(){m({List:null})}function k(N){var O=s,P={Set:{user:{}}},Q={room:{name:t},event:{}};Q.event[N]=!0,P.Set.user[O]=Q,m(P)}function l(){var N={Hello:{username:s,room:{name:t},version:r}};null!=u&&'undefined'!=typeof window.md5&&(N.Hello.password=window.md5(u)),m(N),j()}function m(N){N=JSON.stringify(N)+'\r\n',w.send_string(N)}var s,t,v,w,y,z,A,B,D,H,I,J,L,r='1.3.4',u=null,x=null,C=0,F=0,G=0,K=!1,M=!1;return function(N,O,P){v=N.url,t=N.room,D=P,s=N.name,y=O,N.hasOwnProperty('password')&&(u=N.password)}(a,b,c),{connect:function(){e(b)},set_file:function(N,O,P){z=N,A=O,B=P,h()},setStateGetters:function(N,O){J=O,H=N.is_paused,I=N.get_position,H=H.bind(O),I=I.bind(O)},disconnect:function(){k('left')},playPause:function(){M=!0},seeked:function(){K=!0,M=!0}}};window.SyncPlay=SyncPlay;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Util={};Array.prototype.push8=function(a){this.push(255&a)},Array.prototype.push16=function(a){this.push(255&a>>8,255&a)},Array.prototype.push32=function(a){this.push(255&a>>24,255&a>>16,255&a>>8,255&a)},Array.prototype.map||(Array.prototype.map=function(a){var b=this.length;if("function"!=typeof a)throw new TypeError;for(var c=Array(b),d=arguments[1],g=0;g<b;g++)g in this&&(c[g]=a.call(d,this[g],g,this));return c}),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),Util._log_level="warn",Util.init_logging=function(a){switch("undefined"==typeof a?a=Util._log_level:Util._log_level=a,"undefined"==typeof window.console&&("undefined"==typeof window.opera?window.console={log:function(){},warn:function(){},error:function(){}}:window.console={log:window.opera.postError,warn:window.opera.postError,error:window.opera.postError}),Util.Debug=Util.Info=Util.Warn=Util.Error=function(){},a){case"debug":Util.Debug=function(){};case"info":Util.Info=function(){};case"warn":Util.Warn=function(){};case"error":Util.Error=function(){};case"none":break;default:throw"invalid logging type '"+a+"'";}},Util.get_logging=function(){return Util._log_level},Util.init_logging(),Util.conf_default=function(a,b,c,d,g,h,j,k){var l,n;l=function(o){return h in{arr:1,array:1}&&"undefined"!=typeof o?a[d][o]:a[d]},n=function(o,p){h in{boolean:1,bool:1}?!o||o in{0:1,no:1,"false":1}?o=!1:o=!0:h in{integer:1,int:1}?o=parseInt(o,10):"str"===h?o=o+"":"func"===h&&!o&&(o=function(){}),"undefined"==typeof p?a[d]=o:a[d][p]=o},b[d+"_description"]=k,"undefined"==typeof b["get_"+d]&&(b["get_"+d]=l),"undefined"==typeof b["set_"+d]&&(b["set_"+d]=function(o,p){if(g in{RO:1,ro:1})throw d+" is read-only";else if(g in{WO:1,wo:1}&&"undefined"!=typeof a[d])throw d+" can only be set once";n(o,p)}),"undefined"==typeof c[d]?h in{arr:1,array:1}&&!(j instanceof Array)&&(j=[]):j=c[d],n(j)},Util.conf_defaults=function(a,b,c,d){var g;for(g=0;g<d.length;g++)Util.conf_default(a,b,c,d[g][0],d[g][1],d[g][2],d[g][3],d[g][4])},Util.get_include_uri=function(){return"undefined"==typeof INCLUDE_URI?"include/":INCLUDE_URI},Util._loading_scripts=[],Util._pending_scripts=[],Util.load_scripts=function(a){for(var c,b=document.getElementsByTagName("head")[0],d=Util._loading_scripts,g=Util._pending_scripts,h=0;h<a.length;h++)c=document.createElement("script"),c.type="text/javascript",c.src=Util.get_include_uri()+a[h],c.onload=c.onreadystatechange=function(){for(;0<d.length&&("loaded"===d[0].readyState||"complete"===d[0].readyState);){var k=d.shift();b.appendChild(k)}(!this.readyState||Util.Engine.presto&&"loaded"===this.readyState||"complete"===this.readyState)&&0<=g.indexOf(this)&&(this.onload=this.onreadystatechange=null,g.splice(g.indexOf(this),1),0===g.length&&window.onscriptsload&&window.onscriptsload())},Util.Engine.trident?d.push(c):(c.async=!1,b.appendChild(c)),g.push(c)},Util.getPosition=function(a){var b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;while(a);return{x:b,y:c}},Util.getEventPosition=function(a,b,c){var d,g,h,j;return d=a?a:window.event,d=d.changedTouches?d.changedTouches[0]:d.touches?d.touches[0]:d,d.pageX||d.pageY?(g=d.pageX,h=d.pageY):(d.clientX||d.clientY)&&(g=d.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,h=d.clientY+document.body.scrollTop+document.documentElement.scrollTop),j=Util.getPosition(b),"undefined"==typeof c&&(c=1),{x:(g-j.x)/c,y:(h-j.y)/c}},Util.addEvent=function(a,b,c){if(a.attachEvent){var d=a.attachEvent("on"+b,c);return d}if(a.addEventListener)return a.addEventListener(b,c,!1),!0;throw"Handler could not be attached"},Util.removeEvent=function(a,b,c){if(a.detachEvent){var d=a.detachEvent("on"+b,c);return d}if(a.removeEventListener)return a.removeEventListener(b,c,!1),!0;throw"Handler could not be removed"},Util.stopEvent=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,a.preventDefault?a.preventDefault():a.returnValue=!1},Util.Features={xpath:!!document.evaluate,air:!!window.runtime,query:!!document.querySelector},Util.Engine={presto:function(){return!!window.opera}(),trident:function(){return!!window.ActiveXObject&&(window.XMLHttpRequest?document.querySelectorAll?6:5:4)}(),webkit:function(){try{return!navigator.taintEnabled&&(Util.Features.xpath?Util.Features.query?525:420:419)}catch(a){return!1}}(),gecko:function(){return(document.getBoxObjectFor||null!=window.mozInnerScreenX)&&(document.getElementsByClassName?19:18)}()},Util.Engine.webkit&&(Util.Engine.webkit=function(a){var b=/WebKit\/([0-9.]*) /;return a=(navigator.userAgent.match(b)||["",a])[1],parseFloat(a,10)}(Util.Engine.webkit));/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);