'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CallItem = require('../CallItem');

var _CallItem2 = _interopRequireDefault(_CallItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale,
      active = _ref.active;

  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noCalls },
    _i18n2.default.getString(active ? 'noActiveCalls' : 'noRecords', currentLocale)
  );
}
NoCalls.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  active: _propTypes2.default.bool.isRequired
};
//# sourceMappingURL=index.js.map
