"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  i18n: true
};
exports["default"] = void 0;
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function get() {
    return _i18n["default"];
  }
});
var _RecipientsInput = _interopRequireDefault(require("./RecipientsInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = _RecipientsInput["default"];
//# sourceMappingURL=index.js.map
