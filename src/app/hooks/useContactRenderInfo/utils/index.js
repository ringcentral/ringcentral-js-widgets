"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useFormattedDateFromNow = require("./useFormattedDateFromNow");
Object.keys(_useFormattedDateFromNow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useFormattedDateFromNow[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useFormattedDateFromNow[key];
    }
  });
});
var _getContactDisplayInfo = require("./getContactDisplayInfo");
Object.keys(_getContactDisplayInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getContactDisplayInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getContactDisplayInfo[key];
    }
  });
});
var _copyWithResultMessage = require("./copyWithResultMessage");
Object.keys(_copyWithResultMessage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _copyWithResultMessage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _copyWithResultMessage[key];
    }
  });
});
//# sourceMappingURL=index.js.map
