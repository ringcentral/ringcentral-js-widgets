"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// FIXME: delete this after syncing up
var _default = new _Enum["default"](['business', 'extension', 'home', 'mobile', 'phone', 'unknown', 'company', 'direct', 'fax', 'other']);

exports["default"] = _default;
//# sourceMappingURL=phoneTypes.js.map
