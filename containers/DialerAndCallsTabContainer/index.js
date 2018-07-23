'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _TabContentPanel = require('../../components/TabContentPanel');

var _TabContentPanel2 = _interopRequireDefault(_TabContentPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabContentView = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(TabContentView, _Component);

  function TabContentView(props) {
    (0, _classCallCheck3.default)(this, TabContentView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabContentView.__proto__ || (0, _getPrototypeOf2.default)(TabContentView)).call(this, props));

    _this.getTabs = (0, _reselect.createSelector)(function () {
      return _this.props.currentLocale;
    }, function () {
      return _this.props.currentPath;
    }, function (currentLocale, currentPath) {
      return [{
        path: '/dialer',
        label: _i18n2.default.getString('dialer', currentLocale),
        isActive: function isActive() {
          return currentPath === '/dialer';
        }
      }, {
        path: '/calls',
        label: _i18n2.default.getString('allCalls', currentLocale),
        isActive: function isActive() {
          return currentPath === '/calls';
        }
      }];
    });
    return _this;
  }

  (0, _createClass3.default)(TabContentView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_TabContentPanel2.default, (0, _extends3.default)({}, this.props, {
        tabs: this.getTabs()
      }));
    }
  }]);
  return TabContentView;
}(_react.Component), _class.propTypes = {
  applicable: _propTypes2.default.bool.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  currentPath: _propTypes2.default.string.isRequired,
  goTo: _propTypes2.default.func.isRequired
}, _temp);


function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      callingSettings = _ref$phone.callingSettings,
      routerInteraction = _ref$phone.routerInteraction,
      conferenceCall = _ref$phone.conferenceCall,
      webphone = _ref$phone.webphone;

  var conferenceCallEquipped = !!conferenceCall;
  var isWebphoneMode = callingSettings.callingMode === _callingModes2.default.webphone;
  var applicable = !!(conferenceCallEquipped && isWebphoneMode && webphone.sessions.length);
  return {
    applicable: applicable,
    currentLocale: locale.currentLocale,
    currentPath: routerInteraction.currentPath
  };
}

function mapToFunctions(_, _ref2) {
  var routerInteraction = _ref2.phone.routerInteraction;

  return {
    goTo: function goTo(path) {
      routerInteraction.push(path);
    }
  };
}

var DialerAndCallsTabContainer = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(TabContentView));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = DialerAndCallsTabContainer;
//# sourceMappingURL=index.js.map
