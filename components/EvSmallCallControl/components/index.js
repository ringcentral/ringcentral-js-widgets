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

var _ActiveCallButton = require("./ActiveCallButton");

Object.keys(_ActiveCallButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActiveCallButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActiveCallButton[key];
    }
  });
});

var _RecordControlButton = require("./RecordControlButton");

Object.keys(_RecordControlButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecordControlButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecordControlButton[key];
    }
  });
});

var _RecordingButton = require("./RecordingButton");

Object.keys(_RecordingButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecordingButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecordingButton[key];
    }
  });
});

var _CountDownButton = require("./CountDownButton");

Object.keys(_CountDownButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CountDownButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CountDownButton[key];
    }
  });
});
//# sourceMappingURL=index.js.map
