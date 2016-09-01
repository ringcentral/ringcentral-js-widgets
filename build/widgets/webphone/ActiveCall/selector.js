'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selector = require('../Flip/selector');

var _selector2 = _interopRequireDefault(_selector);

var _selector3 = require('../Transfer/selector');

var _selector4 = _interopRequireDefault(_selector3);

var _selector5 = require('../CallInfo/selector');

var _selector6 = _interopRequireDefault(_selector5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state, props, phone) {
  return {
    // TODO: for function, memorized it
    bye: function bye() {
      return phone.webphone.bye();
    },
    park: function park() {
      var _phone$webphone;

      return (_phone$webphone = phone.webphone).park.apply(_phone$webphone, arguments);
    },
    record: function record() {
      var _phone$webphone2;

      return (_phone$webphone2 = phone.webphone).record.apply(_phone$webphone2, arguments);
    },
    hold: function hold() {
      var _phone$webphone3;

      return (_phone$webphone3 = phone.webphone).hold.apply(_phone$webphone3, arguments);
    },
    mute: function mute() {
      var _phone$webphone4;

      return (_phone$webphone4 = phone.webphone).mute.apply(_phone$webphone4, arguments);
    },
    dtmf: function dtmf() {
      var _phone$webphone5;

      return (_phone$webphone5 = phone.webphone).dtmf.apply(_phone$webphone5, arguments);
    },
    operationStatus: state.common.webphone.operation.status,
    disabledOperation: state.common.webphone.operation.disabled,
    webphoneStatus: state.common.webphone.status,

    flip: (0, _selector2.default)(state, props, phone),
    Transfer: (0, _selector4.default)(state, props, phone),
    callInfo: (0, _selector6.default)(state, props, phone)
  };
};