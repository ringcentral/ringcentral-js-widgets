"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messages = _interopRequireDefault(require("ringcentral-integration/modules/Conference/messages"));

var _messages$requireAdit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messages$requireAdit = {}, _defineProperty(_messages$requireAdit, _messages["default"].requireAditionalNumbers, "Please select the additional dial-in numbers."), _defineProperty(_messages$requireAdit, _messages["default"].scheduledSuccess, "Conference is scheduled."), _messages$requireAdit); // @key: @#@"[messages.requireAditionalNumbers]"@#@ @source: @#@"Please select the additional dial-in numbers."@#@
// @key: @#@"[messages.scheduledSuccess]"@#@ @source: @#@"Conference is scheduled."@#@


exports["default"] = _default;
//# sourceMappingURL=en-GB.js.map
