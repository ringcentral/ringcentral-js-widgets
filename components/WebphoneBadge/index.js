"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WebphoneBadge;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RetryIcon = _interopRequireDefault(require("../../assets/images/RetryIcon.svg"));

var _OvalLoading = _interopRequireDefault(require("../../assets/images/OvalLoading.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emptyFn = function emptyFn() {};

function WebphoneBadge(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      isConnecting = _ref.isConnecting;
  var view = null;

  if (isConnecting) {
    onClick = emptyFn;
    view = _react["default"].createElement(_Badge["default"], {
      className: (0, _classnames["default"])(className, _styles["default"].badge, _styles["default"].loading),
      name: _i18n["default"].getString('webphoneUnavailable', currentLocale)
    }, _i18n["default"].getString('Connecting', currentLocale), _react["default"].createElement(_OvalLoading["default"], {
      width: 12,
      height: 12
    }));
  } else {
    view = _react["default"].createElement(_Badge["default"], {
      className: (0, _classnames["default"])(className, _styles["default"].badge, _styles["default"].result),
      name: _i18n["default"].getString('webphoneUnavailable', currentLocale)
    }, _i18n["default"].getString('webphoneUnavailable', currentLocale), _react["default"].createElement(_RetryIcon["default"], {
      width: 12,
      height: 12
    }));
  }

  return _react["default"].createElement(_Draggable["default"], {
    className: _styles["default"].root,
    onClick: onClick
  }, view);
}

WebphoneBadge.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func,
  isConnecting: _propTypes["default"].bool
};
WebphoneBadge.defaultProps = {
  className: null,
  onClick: function onClick() {},
  isConnecting: false
};
//# sourceMappingURL=index.js.map
