'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SettingsPanel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RcFont = require('../../../src/assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

var _Header = require('../../../src/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../../../src/components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Line = require('../../../src/components/Line');

var _Line2 = _interopRequireDefault(_Line);

var _LinkLine = require('../../../src/components/LinkLine');

var _LinkLine2 = _interopRequireDefault(_LinkLine);

var _IconLine = require('../../../src/components/IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

var _Eula = require('../../../src/components/Eula');

var _Eula2 = _interopRequireDefault(_Eula);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Switch = require('../../../src/components/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SettingsPanel(_ref) {
  var children = _ref.children,
      showRegion = _ref.showRegion,
      className = _ref.className,
      onLogoutButtonClick = _ref.onLogoutButtonClick,
      loginNumber = _ref.loginNumber,
      version = _ref.version,
      currentLocale = _ref.currentLocale,
      brandId = _ref.brandId,
      EulaRenderer = _ref.EulaRenderer;

  var region = showRegion ? _react2.default.createElement(
    _LinkLine2.default,
    {
      to: '/settings/region'
    },
    _i18n2.default.getString('region')
  ) : null;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(
      _Header2.default,
      null,
      _i18n2.default.getString('settings')
    ),
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.content },
      _react2.default.createElement(
        _LinkLine2.default,
        {
          to: '/settings/calling'
        },
        _i18n2.default.getString('calling')
      ),
      region,
      children,
      _react2.default.createElement(
        _IconLine2.default,
        {
          onClick: onLogoutButtonClick,
          icon: _react2.default.createElement('span', { className: _RcFont2.default.RC_Logout })
        },
        _i18n2.default.getString('logout'),
        ' ',
        loginNumber
      ),
      _react2.default.createElement(
        _Line2.default,
        null,
        _i18n2.default.getString('version'),
        ' ',
        version
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.eulaContainer },
        _react2.default.createElement(EulaRenderer, {
          className: _styles2.default.eula,
          currentLocale: currentLocale,
          brandId: brandId
        })
      )
    )
  );
}

SettingsPanel.propTypes = {
  showRegion: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  loginNumber: _react.PropTypes.string.isRequired,
  onLogoutButtonClick: _react.PropTypes.func.isRequired,
  version: _react.PropTypes.string.isRequired,
  brandId: _react.PropTypes.string.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  EulaRenderer: _react.PropTypes.func,
  callingSettingsUrl: _react.PropTypes.string.isRequired
};
SettingsPanel.defaultProps = {
  EulaRenderer: _Eula2.default
};
//# sourceMappingURL=index.js.map
