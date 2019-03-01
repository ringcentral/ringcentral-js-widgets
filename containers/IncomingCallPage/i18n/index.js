"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = _interopRequireDefault(require("@ringcentral-integration/i18n"));

var _loadLocale = _interopRequireDefault(require("./loadLocale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _i18n.default(_loadLocale.default);

exports.default = _default;
//# sourceMappingURL=index.js.map
