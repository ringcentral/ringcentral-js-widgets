"use strict";

var _global$chrome;
global.chrome = (_global$chrome = global.chrome) !== null && _global$chrome !== void 0 ? _global$chrome : {
  runtime: {
    onMessage: {
      addListener: function addListener(listener) {},
      removeListener: function removeListener(listener) {}
    },
    sendMessage: function sendMessage(message) {}
  },
  tabs: {
    query: function query(queryInfo) {},
    sendMessage: function sendMessage(tabId, message) {}
  }
};
global.MediaStream = jest.fn().mockReturnValue(true);
global.RTCPeerConnection = jest.fn().mockReturnValue(true);
//# sourceMappingURL=jest.setup.js.map
