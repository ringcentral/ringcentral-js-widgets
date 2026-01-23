"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.t = exports["default"] = void 0;
var _i18n = _interopRequireDefault(require("@ringcentral-integration/i18n"));
var _utils = require("@ringcentral-integration/utils");
var _loadLocale = _interopRequireDefault(require("./loadLocale"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-expect-error

var i18n = new _i18n["default"](_loadLocale["default"]);
var t = exports.t = (0, _utils.getTranslateFn)(i18n);
var _default = exports["default"] = i18n;
//# sourceMappingURL=index.js.map
