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
var _exportNames = {
  i18n: true
};
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function get() {
    return _i18n["default"];
  }
});
exports["default"] = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

var _RecipientsInput = _interopRequireDefault(require("./RecipientsInput"));

var _SelectedRecipientItem = require("./SelectedRecipientItem");

Object.keys(_SelectedRecipientItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SelectedRecipientItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SelectedRecipientItem[key];
    }
  });
});

var _SelectedRecipients = require("./SelectedRecipients");

Object.keys(_SelectedRecipients).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SelectedRecipients[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SelectedRecipients[key];
    }
  });
});

var _focusCampo = require("./focusCampo");

Object.keys(_focusCampo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _focusCampo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _focusCampo[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _RecipientsInput["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
