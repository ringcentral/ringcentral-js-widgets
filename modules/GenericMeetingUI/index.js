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

var _GenericMeetingUI = require("./GenericMeetingUI");

Object.keys(_GenericMeetingUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GenericMeetingUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GenericMeetingUI[key];
    }
  });
});

var _GenericMeetingUI2 = require("./GenericMeetingUI.interface");

Object.keys(_GenericMeetingUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GenericMeetingUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GenericMeetingUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
