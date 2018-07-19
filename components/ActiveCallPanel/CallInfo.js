'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallInfo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallInfo(props) {
  var avatar = void 0;
  // todo: conference avatars
  if (props.avatarUrl) {
    avatar = _react2.default.createElement('img', { src: props.avatarUrl, alt: 'avatar' });
  } else {
    avatar = _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.portrait, _styles2.default.icon) });
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.userInfo },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.avatarContainer },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.avatar },
        avatar
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.userName },
      _react2.default.createElement(_ContactDisplay2.default, {
        className: _styles2.default.contactDisplay,
        selectClassName: _styles2.default.dropdown,
        contactMatches: props.nameMatches,
        phoneNumber: props.phoneNumber,
        fallBackName: props.fallBackName,
        currentLocale: props.currentLocale,
        areaCode: props.areaCode,
        countryCode: props.countryCode,
        showType: false,
        disabled: false,
        selected: props.selectedMatcherIndex,
        onSelectContact: props.onSelectMatcherName,
        isLogging: false,
        enableContactFallback: true,
        brand: props.brand,
        showPlaceholder: props.showContactDisplayPlaceholder,
        sourceIcons: props.sourceIcons
      })
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.userPhoneNumber },
      props.formatPhone(props.phoneNumber)
    )
  );
}

CallInfo.propTypes = {
  phoneNumber: _propTypes2.default.string,
  formatPhone: _propTypes2.default.func.isRequired,
  nameMatches: _propTypes2.default.array.isRequired,
  fallBackName: _propTypes2.default.string.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  selectedMatcherIndex: _propTypes2.default.number.isRequired,
  onSelectMatcherName: _propTypes2.default.func.isRequired,
  avatarUrl: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};

CallInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined
};
//# sourceMappingURL=CallInfo.js.map
