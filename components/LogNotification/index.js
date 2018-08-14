'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogNotification;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _LogBasicInfo = require('../LogBasicInfo');

var _LogBasicInfo2 = _interopRequireDefault(_LogBasicInfo);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogNotification(_ref) {
  var formatPhone = _ref.formatPhone,
      currentLog = _ref.currentLog,
      currentLocale = _ref.currentLocale,
      showLogButton = _ref.showLogButton,
      isExpand = _ref.isExpand,
      onStay = _ref.onStay,
      onDiscard = _ref.onDiscard,
      onSave = _ref.onSave,
      onExpand = _ref.onExpand;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.container },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.basicInfo },
      _react2.default.createElement(_LogBasicInfo2.default, {
        currentLog: currentLog,
        currentLocale: currentLocale,
        formatPhone: formatPhone
      }),
      showLogButton ? _react2.default.createElement(
        _Button2.default,
        {
          disabled: isExpand,
          className: (0, _classnames2.default)(_styles2.default.expandButton, isExpand && _styles2.default.expandDisableButton),
          onClick: function onClick() {
            return onExpand();
          } },
        _i18n2.default.getString('log', currentLocale)
      ) : null
    ),
    isExpand ? _react2.default.createElement(
      'div',
      { className: _styles2.default.confirmationContainer },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.confirmationInfo },
        _i18n2.default.getString('confirmationInfo', currentLocale)
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.confirmationButtons },
        onSave ? _react2.default.createElement(
          _Button2.default,
          {
            className: (0, _classnames2.default)(_styles2.default.saveButton, _styles2.default.selected),
            onClick: function onClick() {
              return onSave();
            } },
          _i18n2.default.getString('save', currentLocale)
        ) : null,
        onDiscard ? _react2.default.createElement(
          _Button2.default,
          {
            className: _styles2.default.discardButton,
            onClick: function onClick() {
              return onDiscard();
            } },
          _i18n2.default.getString('discard', currentLocale)
        ) : null,
        onStay ? _react2.default.createElement(
          _Button2.default,
          {
            className: _styles2.default.stayButton,
            onClick: function onClick() {
              return onStay();
            } },
          _i18n2.default.getString('stay', currentLocale)
        ) : null
      )
    ) : null
  );
}

LogNotification.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showLogButton: _propTypes2.default.bool,
  currentLog: _propTypes2.default.object,
  formatPhone: _propTypes2.default.func,
  isExpand: _propTypes2.default.bool,
  onStay: _propTypes2.default.func,
  onDiscard: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  onExpand: _propTypes2.default.func
};

LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined
};
//# sourceMappingURL=index.js.map
