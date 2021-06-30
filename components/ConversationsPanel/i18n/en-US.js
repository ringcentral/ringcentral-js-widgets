"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _title$search$compose;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$search$compose = {
  title: 'Messages',
  search: 'Search...',
  composeText: 'Compose Text',
  noMessages: 'No Messages',
  noSearchResults: 'No matching records found'
}, _defineProperty(_title$search$compose, _messageTypes["default"].all, 'All'), _defineProperty(_title$search$compose, _messageTypes["default"].voiceMail, 'Voice'), _defineProperty(_title$search$compose, _messageTypes["default"].text, 'Text'), _defineProperty(_title$search$compose, _messageTypes["default"].fax, 'Fax'), _title$search$compose);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
