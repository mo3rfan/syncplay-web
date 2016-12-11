// @flow

'use strict';
var SyncPlay = function (initobj, onconnected, videonode) {
  var version = "1.3.4";
  var username: string;
  var room: string;
  var password = null;
  var url: string;
  var socket;
  var motd = null;
  var conn_callback: Function;
  var filename: string;
  var duration: number;
  var size: number;
  var clientRtt: number = 0;
  var node;
  var clientno;

  var clientIgnoringOnTheFly = 0;
  var serverIgnoringOnTheFly = 0;

  var paused: Function;
  var position: Function;
  var videoobj;
  var seek = false;
  var latencyCalculation;

  var stateChanged = false;

  function init(initobj, onconnected, vnode) {
      url = initobj.url;
      room = initobj.room;
      node = vnode;
      username = initobj.name;
      conn_callback = onconnected;
      if (initobj.hasOwnProperty("password")) {
          password = initobj.password;
      }
  }
  init(initobj, onconnected, videonode);

  function establishWS(conncallback) {
      socket = new WebSocket("ws://" + url, "base64");
      socket.onopen = function (p) {
          sendHello();
      };
      socket.onmessage = socketHandler;
  }

  function sendState(position, paused, doSeek, latencyCalculation, stateChange) {
      var state = {};
      if (typeof(stateChange) == "undefined") {
          return false;
      }
      var positionAndPausedIsSet = ((position != null) && (paused != null));
      var clientIgnoreIsNotSet = (clientIgnoringOnTheFly == 0 || serverIgnoringOnTheFly != 0);
      if (clientIgnoreIsNotSet && positionAndPausedIsSet) {
          state["playstate"] = {};
          state["playstate"]["position"] = position(videoobj);
          state["playstate"]["paused"] = paused(videoobj);
          if (doSeek) {
              state["playstate"]["doSeek"] = doSeek;
              seek = false;
          }
      }
      state["ping"] = {}
      if (latencyCalculation != null) {
          state["ping"]["latencyCalculation"] = latencyCalculation;
      }
      state["ping"]["clientLatencyCalculation"] = (new Date).getTime() / 1000;
      state["ping"]["clientRtt"] = clientRtt;
      if (stateChange) {
          clientIgnoringOnTheFly += 1;
      }
      if (serverIgnoringOnTheFly || clientIgnoringOnTheFly) {
          state["ignoringOnTheFly"] = {};
          if (serverIgnoringOnTheFly) {
              state["ignoringOnTheFly"]["server"] = serverIgnoringOnTheFly;
              serverIgnoringOnTheFly = 0;
          }
          if (clientIgnoringOnTheFly) {
              state["ignoringOnTheFly"]["client"] = clientIgnoringOnTheFly;
          }
      }
      send({"State": state});
  }

  function socketHandler(d: MessageEvent) {
      var large_payload: string = d.data.toString();
      var split_payload = atob(large_payload).split("\r\n");
      for (var index = 0; index < split_payload.length; index += 1) {
          if (split_payload[index] == "") {
              break;
          }
          var payload = JSON.parse(split_payload[index]);
          console.log("Server << " + JSON.stringify(payload));
          if (payload.hasOwnProperty("Hello")) {
              motd = payload.Hello.motd;
              sendRoomEvent("joined");
              conn_callback({
                  connected: true,
                  motd: motd
              });
          }
          if (payload.hasOwnProperty("Error")) {
              throw payload.Error;
          }
          if (payload.hasOwnProperty("Set")) {
              if (payload.Set.hasOwnProperty("user")) {
                  for (var i in payload.Set.user) {
                      if (payload.Set.user[i].hasOwnProperty("event")) {
                          var sevent = new CustomEvent("userlist", {
                              detail: {
                                  user: Object.keys(payload.Set.user)[0],
                                  evt: Object.keys(payload.Set.user[i]["event"])[0]
                              },
                              bubbles: true,
                              cancelable: true
                          });
                          node.dispatchEvent(sevent);
                      }
                      if (payload.Set.user[i].hasOwnProperty("file")) {
                          if (Object.keys(payload.Set.user)[0] != username) {
                              var sevent = new CustomEvent("fileupdate", {
                                  detail: payload.Set,
                                  bubbles: true,
                                  cancelable: true
                              });
                              node.dispatchEvent(sevent);
                          }
                      }
                  }
              }
          }
          if (payload.hasOwnProperty("List")) {
              var room = Object.keys(payload.List)[0];
              var sevent = new CustomEvent("listusers", {
                  detail: payload.List[room],
                  bubbles: true,
                  cancelable: true
              });
              node.dispatchEvent(sevent);
          }
          if (payload.hasOwnProperty("State")) {
              clientRtt = payload.State.ping.yourLatency;
              latencyCalculation = payload.State.ping.latencyCalculation;

              if (payload.State.hasOwnProperty("ignoringOnTheFly")) {
                  var ignore = payload.State.ignoringOnTheFly;
                  if (ignore.hasOwnProperty("server")) {
                      serverIgnoringOnTheFly = ignore["server"];
                      clientIgnoringOnTheFly = 0;
                      stateChanged = false;
                    } else if (ignore.hasOwnProperty("client")) {
                        if ((ignore["client"]) == clientIgnoringOnTheFly) {
                            clientIgnoringOnTheFly = 0;
                            stateChanged = false;
                        }
                    }
                }
        if (payload.State.playstate.hasOwnProperty("setBy")
                ) {
          if (payload.State.playstate.setBy != null) { 
            if (payload.State.playstate.setBy != username) { 
              var sevent = new CustomEvent("userevent", {
                detail: payload.State.playstate,
                bubbles: true,
                cancelable: true
              });
              if (!stateChanged && !clientIgnoringOnTheFly) {
                stateChanged = false;
                node.dispatchEvent(sevent);
              }
            }
          }
        }
        sendState(position, paused, seek, latencyCalculation, stateChanged);
      }
    }
  }

  function sendFileInfo() {
    var payload = {
      "Set": {
        "file": {
          "duration": duration,
          "name": filename,
          "size": size
        }
      }
    };
    send(payload);
  }

  function sendList() {
    var payload = {
      "List": null
    };
    send(payload);
  }

  function sendRoomEvent(evt) {
    var user = username;
    var payload = {
      "Set": {
        "user": {}
      }
    };
    var userval = {
      "room": {
        "name": room
      },
      "event": {}
    }
    userval["event"][evt] = true;
    payload.Set.user[user] = userval;
    send(payload);
  }

  function sendHello() {
    var payload: {
     Hello: {
        username: string,
        password?: string,
        room: {},
        version: string
     }
    } = {
      "Hello": {
        "username": username,
        "room": {
          "name": room
        },
        "version": version
      }
    };
    if (password != null) {
        if (typeof(window.md5) != "undefined") {
            payload.Hello["password"] = window.md5(password);
        }
    }
    send(payload);
    sendList();
  }

  function send(message) {
    console.log("Client >> " + JSON.stringify(message));
    message = btoa(JSON.stringify(message) + "\r\n");
    socket.send(message);
  }

  function setGetters(fobj, second) {
    videoobj = second;
    paused = fobj.is_paused;
    position = fobj.get_position;
    paused = paused.bind(second);
    position = position.bind(second);
  }

  function playPause() {
    stateChanged = true;
  }

  function seeked() {
    seek = true;
    stateChanged = true;
  }

  return {
    connect: function () {
      establishWS(onconnected);
    },
    set_file: function (name, length, size_bytes) {
      filename = name;
      duration = length;
      size = size_bytes;
      sendFileInfo();
    },
    setStateGetters: setGetters,
    disconnect: function () {
      sendRoomEvent("left");
    },
    playPause: playPause,
    seeked: seeked
  }
};
