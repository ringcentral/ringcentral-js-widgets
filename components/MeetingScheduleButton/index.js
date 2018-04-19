'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeetingScheduleButton = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(MeetingScheduleButton, _PureComponent);

  function MeetingScheduleButton() {
    (0, _classCallCheck3.default)(this, MeetingScheduleButton);
    return (0, _possibleConstructorReturn3.default)(this, (MeetingScheduleButton.__proto__ || (0, _getPrototypeOf2.default)(MeetingScheduleButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(MeetingScheduleButton, [{
    key: 'getI18nButtonString',
    value: function getI18nButtonString() {
      return _i18n2.default.getString('schedule');
    }
  }, {
    key: 'getI18nPromptString',
    value: function getI18nPromptString() {
      return _i18n2.default.getString('prompt');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hidden = _props.hidden,
          disabled = _props.disabled,
          meeting = _props.meeting,
          _onClick = _props.onClick,
          brand = _props.brand,
          currentLocale = _props.currentLocale;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.inviteBox, !hidden ? _styles2.default.withShadow : _styles2.default.onlyButton) },
        hidden ? _react2.default.createElement(
          'div',
          { className: _styles2.default.actionPrompt },
          this.getI18nPromptString()
        ) : null,
        _react2.default.createElement(
          'button',
          {
            onClick: function onClick() {
              return !disabled && setTimeout(function () {
                return _onClick(meeting);
              }, 100);
            },
            disabled: disabled,
            className: (0, _classnames2.default)(_styles2.default.button, disabled ? _styles2.default.disabled : null) },
          this.getI18nButtonString()
        )
      );
    }
  }]);
  return MeetingScheduleButton;
}(_react.PureComponent), _class.propTypes = {
  currentLocale: _propTypes2.default.string,
  meeting: _propTypes2.default.object,
  hidden: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  brand: _propTypes2.default.string
}, _class.defaultProps = {
  meeting: null,
  hidden: false,
  disabled: false,
  brand: undefined,
  currentLocale: undefined
}, _temp);
exports.default = MeetingScheduleButton;
//# sourceMappingURL=index.js.map
