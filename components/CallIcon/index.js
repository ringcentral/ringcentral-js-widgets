'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callIconMap;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

var _ConferenceCallIcon = require('../../assets/images/ConferenceCallIcon.svg');

var _ConferenceCallIcon2 = _interopRequireDefault(_ConferenceCallIcon);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callIconMap = (_callIconMap = {}, (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.inbound, _DynamicsFont2.default.inbound), (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.outbound, _DynamicsFont2.default.outbound), _callIconMap);

function CallIcon(_ref) {
  var direction = _ref.direction,
      ringing = _ref.ringing,
      inboundTitle = _ref.inboundTitle,
      outboundTitle = _ref.outboundTitle,
      isOnConferenceCall = _ref.isOnConferenceCall,
      showAvatar = _ref.showAvatar,
      avatarUrl = _ref.avatarUrl,
      _ref$extraNum = _ref.extraNum,
      extraNum = _ref$extraNum === undefined ? 0 : _ref$extraNum;

  var title = direction === _callDirections2.default.inbound ? inboundTitle : outboundTitle;
  var symbol = void 0;
  if (showAvatar) {
    symbol = _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.callIcon, _styles2.default.avatar) },
      _react2.default.createElement(_CallAvatar2.default, {
        isOnConferenceCall: isOnConferenceCall,
        avatarUrl: avatarUrl,
        extraNum: extraNum })
    );
  } else {
    symbol = _react2.default.createElement(
      'div',
      { className: _styles2.default.callIcon },
      _react2.default.createElement('span', {
        className: (0, _classnames2.default)(callIconMap[direction], _styles2.default.activeCall, ringing && _styles2.default.ringing),
        title: title
      })
    );
  }
  return symbol;
}

CallIcon.propTypes = {
  direction: _propTypes2.default.string.isRequired,
  ringing: _propTypes2.default.bool,
  isOnConferenceCall: _propTypes2.default.bool,
  inboundTitle: _propTypes2.default.string,
  outboundTitle: _propTypes2.default.string,
  showAvatar: _propTypes2.default.bool,
  avatarUrl: _propTypes2.default.string
};

CallIcon.defaultProps = {
  ringing: false,
  isOnConferenceCall: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  showAvatar: false,
  avatarUrl: null
};

exports.default = CallIcon;
//# sourceMappingURL=index.js.map
