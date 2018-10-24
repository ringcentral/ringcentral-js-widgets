'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _phoneTypes$extension;

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _phoneTypes = require('../../../enums/phoneTypes');

var _phoneTypes2 = _interopRequireDefault(_phoneTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_phoneTypes$extension = {}, (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.extension, 'Ext.'), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.direct, 'Direct'), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.mobile, 'Mobile'), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.home, 'Home'), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.business, 'Business'), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.fax, 'Fax'), (0, _defineProperty3.default)(_phoneTypes$extension, 'emailLabel', 'Email'), (0, _defineProperty3.default)(_phoneTypes$extension, 'call', 'Call'), (0, _defineProperty3.default)(_phoneTypes$extension, 'text', 'Text'), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.available, 'Available'), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.offline, 'Invisible'), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.busy, 'Busy'), (0, _defineProperty3.default)(_phoneTypes$extension, _dndStatus2.default.doNotAcceptAnyCalls, 'Do not Disturb'), (0, _defineProperty3.default)(_phoneTypes$extension, 'notActivated', 'Inactive'), _phoneTypes$extension);
//# sourceMappingURL=en-US.js.map
