'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OfflineModeBadge;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OfflineModeBadge(_ref) {
  var className = _ref.className,
      offline = _ref.offline,
      currentLocale = _ref.currentLocale,
      showOfflineAlert = _ref.showOfflineAlert;

  if (offline) {
    return _react2.default.createElement(
      'a',
      {
        href: '#offline-badge',
        className: (0, _classnames2.default)(_styles2.default.root, className),
        onClick: showOfflineAlert },
      _i18n2.default.getString('offlineMode', currentLocale)
    );
  }
  return null;
}

OfflineModeBadge.propTypes = {
  offline: _react.PropTypes.bool.isRequired,
  showOfflineAlert: _react.PropTypes.func.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};

OfflineModeBadge.defaultProps = {
  className: null
};
//# sourceMappingURL=index.js.map
