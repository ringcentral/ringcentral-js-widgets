"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");

var _phoneTypes$extension;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_phoneTypes$extension = {}, _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, 'Ext.'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.direct, 'Direct'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.mobile, 'Mobile'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.contact, 'Contact phone'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.home, 'Home'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.business, 'Business'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.fax, 'Fax'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.company, 'Company'), _defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.other, 'Other'), _defineProperty(_phoneTypes$extension, "emailLabel", 'Email'), _defineProperty(_phoneTypes$extension, "call", 'Call'), _defineProperty(_phoneTypes$extension, "text", 'Text'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.available, 'Available'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.offline, 'Invisible'), _defineProperty(_phoneTypes$extension, _presenceStatus.presenceStatus.busy, 'Busy'), _defineProperty(_phoneTypes$extension, _dndStatus["default"].doNotAcceptAnyCalls, 'Do not Disturb'), _defineProperty(_phoneTypes$extension, "notActivated", 'Inactive'), _defineProperty(_phoneTypes$extension, "company", 'Company'), _defineProperty(_phoneTypes$extension, "jobTitle", 'Title'), _defineProperty(_phoneTypes$extension, "site", 'Site'), _phoneTypes$extension);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
