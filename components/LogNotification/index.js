"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogNotification;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button"));

var _LogBasicInfo = _interopRequireDefault(require("../LogBasicInfo"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

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
  return _react.default.createElement("div", {
    className: _styles.default.container
  }, _react.default.createElement("div", {
    className: _styles.default.basicInfo
  }, _react.default.createElement(_LogBasicInfo.default, {
    currentLog: currentLog,
    currentLocale: currentLocale,
    formatPhone: formatPhone
  }), showLogButton ? _react.default.createElement(_Button.default, {
    disabled: isExpand,
    className: (0, _classnames.default)(_styles.default.expandButton, isExpand && _styles.default.expandDisableButton),
    onClick: function onClick() {
      return onExpand();
    }
  }, _i18n.default.getString('log', currentLocale)) : null), isExpand ? _react.default.createElement("div", {
    className: _styles.default.confirmationContainer
  }, _react.default.createElement("div", {
    className: _styles.default.confirmationInfo
  }, _i18n.default.getString('confirmationInfo', currentLocale)), _react.default.createElement("div", {
    className: _styles.default.confirmationButtons
  }, onSave ? _react.default.createElement(_Button.default, {
    className: (0, _classnames.default)(_styles.default.saveButton, _styles.default.selected),
    onClick: function onClick() {
      return onSave();
    }
  }, _i18n.default.getString('save', currentLocale)) : null, onDiscard ? _react.default.createElement(_Button.default, {
    className: _styles.default.discardButton,
    onClick: function onClick() {
      return onDiscard();
    }
  }, _i18n.default.getString('discard', currentLocale)) : null, onStay ? _react.default.createElement(_Button.default, {
    className: _styles.default.stayButton,
    onClick: function onClick() {
      return onStay();
    }
  }, _i18n.default.getString('stay', currentLocale)) : null)) : null);
}

LogNotification.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  showLogButton: _propTypes.default.bool,
  currentLog: _propTypes.default.object,
  formatPhone: _propTypes.default.func,
  isExpand: _propTypes.default.bool,
  onStay: _propTypes.default.func,
  onDiscard: _propTypes.default.func,
  onSave: _propTypes.default.func,
  onExpand: _propTypes.default.func
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
