"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebphoneBadge;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebphoneBadge(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      currentLocale = _ref.currentLocale;
  return _react.default.createElement(_Draggable.default, {
    className: _styles.default.root,
    onClick: onClick
  }, _react.default.createElement(_Badge.default, {
    className: (0, _classnames.default)(className, _styles.default.badge),
    name: _i18n.default.getString('webphoneUnavailable', currentLocale)
  }, _i18n.default.getString('webphoneUnavailable', currentLocale)));
}

WebphoneBadge.propTypes = {
  className: _propTypes.default.string,
  currentLocale: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func
};
WebphoneBadge.defaultProps = {
  className: null,
  onClick: function onClick() {}
};
//# sourceMappingURL=index.js.map
