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

var _ExtensionPhoneNumber = require("./ExtensionPhoneNumber");

Object.keys(_ExtensionPhoneNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionPhoneNumber[key];
    }
  });
});

var _ExtensionPhoneNumber2 = require("./ExtensionPhoneNumber.interface");

Object.keys(_ExtensionPhoneNumber2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionPhoneNumber2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
