'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallsPanel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('core-js/fn/array/find');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _CallList = require('../CallList');

var _CallList2 = _interopRequireDefault(_CallList);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallsPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      calls = _ref.calls,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      onViewContact = _ref.onViewContact,
      onLogCall = _ref.onLogCall,
      disableLinks = _ref.disableLinks,
      dateTimeFormatter = _ref.dateTimeFormatter,
      showSpinner = _ref.showSpinner,
      title = _ref.title,
      active = _ref.active;

  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_CallList2.default, {
    currentLocale: currentLocale,
    calls: calls,
    areaCode: areaCode,
    countryCode: countryCode,
    onViewContact: onViewContact,
    onLogCall: onLogCall,
    disableLinks: disableLinks,
    dateTimeFormatter: dateTimeFormatter,
    active: active
  });
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(
      _Header2.default,
      null,
      title
    ),
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.content },
      content
    )
  );
}

CallsPanel.propTypes = {
  currentLocale: _react.PropTypes.string.isRequired,
  calls: _react.PropTypes.arrayOf(_react.PropTypes.any).isRequired,
  areaCode: _react.PropTypes.string.isRequired,
  countryCode: _react.PropTypes.string.isRequired,
  onViewContact: _react.PropTypes.func,
  onLogCall: _react.PropTypes.func,
  disableLinks: _react.PropTypes.bool.isRequired,
  dateTimeFormatter: _react.PropTypes.func.isRequired,
  showSpinner: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  active: _react.PropTypes.bool
};

CallsPanel.defaultProps = {
  onViewContact: undefined,
  onLogCall: undefined,
  showSpinner: false,
  title: '',
  active: false
};
//# sourceMappingURL=index.js.map
