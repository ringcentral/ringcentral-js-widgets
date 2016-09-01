'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _integration = require('../../../utils/integration/');

var _locale = require('../../../utils/locale/');

var _WebPhone = require('../../../widgets/webphone/WebPhone/');

var _WebPhone2 = _interopRequireDefault(_WebPhone);

var _selector = require('../../../widgets/webphone/ActiveCall/selector');

var _selector2 = _interopRequireDefault(_selector);

var _selector3 = require('../../../widgets/webphone/DialPad/selector');

var _selector4 = _interopRequireDefault(_selector3);

var _selector5 = require('../../../widgets/webphone/IncomingCall/selector');

var _selector6 = _interopRequireDefault(_selector5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statusMapping = {
  PRE_REGISTER: 'DISABLED',
  REGISTER_SUCCESSED: 'IDLE',
  CALL_INCOMING: 'ON_INCOMING_CALL',
  CALL_CONNECTING: 'ON_CALL',
  CALL_CONNECTED: 'ON_CALL'
};

exports.default = (0, _integration.connect)(function (state, props, phone) {
  return {
    // enums
    enums: phone.webphone.enums,

    // <WebPhone />
    status: statusMapping[state.common.webphone.status],

    incomingCall: (0, _selector6.default)(state, props, phone),
    activeCall: (0, _selector2.default)(state, props, phone),
    dialPad: (0, _selector4.default)(state, props, phone),

    getString: _locale.getString.bind(null, state.locale.lang)
  };
})(_WebPhone2.default);