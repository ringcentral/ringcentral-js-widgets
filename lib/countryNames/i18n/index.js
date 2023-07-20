"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.t = exports["default"] = void 0;
var _i18n = _interopRequireDefault(require("@ringcentral-integration/i18n"));
var _utils = require("@ringcentral-integration/utils");
var _loadLocale = _interopRequireDefault(require("./loadLocale"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// @ts-expect-error

var i18n = new _i18n["default"](_loadLocale["default"]);
var t = (0, _utils.getTranslateFn)(i18n);
exports.t = t;
var _default = i18n;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
