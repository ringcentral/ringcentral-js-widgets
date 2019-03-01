"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OfflineModeBadge;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OfflineModeBadge(_ref) {
  var className = _ref.className,
      offline = _ref.offline,
      currentLocale = _ref.currentLocale,
      showOfflineAlert = _ref.showOfflineAlert;

  if (offline) {
    return _react.default.createElement(_Draggable.default, {
      className: _styles.default.root
    }, _react.default.createElement(_Badge.default, {
      className: (0, _classnames.default)(className, _styles.default.badge),
      name: _i18n.default.getString('offlineMode', currentLocale),
      onClick: showOfflineAlert
    }, _i18n.default.getString('offlineMode', currentLocale)));
  }

  return null;
}

OfflineModeBadge.propTypes = {
  offline: _propTypes.default.bool.isRequired,
  showOfflineAlert: _propTypes.default.func.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  className: _propTypes.default.string
};
OfflineModeBadge.defaultProps = {
  className: null
};
//# sourceMappingURL=index.js.map
