'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebphoneBadge;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Badge = require('../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _Draggable = require('../Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebphoneBadge(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    _Draggable2.default,
    { className: _styles2.default.root, onClick: onClick },
    _react2.default.createElement(
      _Badge2.default,
      {
        className: (0, _classnames2.default)(className, _styles2.default.badge),
        name: _i18n2.default.getString('webphoneUnavailable', currentLocale)
      },
      _i18n2.default.getString('webphoneUnavailable', currentLocale)
    )
  );
}

WebphoneBadge.propTypes = {
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func
};

WebphoneBadge.defaultProps = {
  className: null,
  onClick: function onClick() {}
};
//# sourceMappingURL=index.js.map
