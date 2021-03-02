"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RecentMessages = require("./RecentMessages");

Object.keys(_RecentMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecentMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecentMessages[key];
    }
  });
});

var _RecentMessages2 = require("./RecentMessages.interface");

Object.keys(_RecentMessages2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecentMessages2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecentMessages2[key];
    }
  });
});

var _messageStatus = require("./messageStatus");

Object.keys(_messageStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _messageStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _messageStatus[key];
    }
  });
});

var _recentMessagesHelper = require("./recentMessagesHelper");

Object.keys(_recentMessagesHelper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _recentMessagesHelper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _recentMessagesHelper[key];
    }
  });
});
//# sourceMappingURL=index.js.map
