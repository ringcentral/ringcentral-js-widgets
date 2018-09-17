'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _CallCtrlPanel = require('../../components/CallCtrlPanel');

var _CallCtrlPanel2 = _interopRequireDefault(_CallCtrlPanel);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _ActiveCallPad = require('../../components/ActiveCallPad');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file simplify active call control page
 * detail: https://jira.ringcentral.com/browse/RCINT-8256
 */

function mapToProps(_, _ref) {
  var phone = _ref.phone;
  var activeCallControl = phone.activeCallControl,
      regionSettings = phone.regionSettings,
      callMonitor = phone.callMonitor,
      alert = phone.alert,
      routerInteraction = phone.routerInteraction;

  return {
    activeCallControl: activeCallControl,
    regionSettings: regionSettings,
    callMonitor: callMonitor,
    alert: alert,
    routerInteraction: routerInteraction
  };
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone;

  return {};
}
/* eslint-disable react/prefer-stateless-function */

var ActiveCallControl = function (_Component) {
  (0, _inherits3.default)(ActiveCallControl, _Component);

  function ActiveCallControl() {
    (0, _classCallCheck3.default)(this, ActiveCallControl);
    return (0, _possibleConstructorReturn3.default)(this, (ActiveCallControl.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallControl)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActiveCallControl, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentLocale = _props.currentLocale,
          activeCallControl = _props.activeCallControl,
          regionSettings = _props.regionSettings,
          callMonitor = _props.callMonitor,
          routerInteraction = _props.routerInteraction,
          renderContactName = _props.renderContactName;
      var activeSession = activeCallControl.activeSession,
          sessionId = activeCallControl.activeSessionId;


      var activeCall = (0, _utils.pickEleByProps)({ sessionId: String(sessionId) }, callMonitor.otherDeviceCalls)[0] || {};

      if (!activeSession) {
        routerInteraction.goBack();
        return null;
      }

      var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeCall, renderContactName(sessionId), currentLocale),
          fallBackName = _pickFallBackInfo.fallBackName,
          fallBackNumber = _pickFallBackInfo.fallBackNumber;

      var muteCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.muteCtrl,
          transferCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.transferCtrl,
          holdCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.holdCtrl;

      var callCtrlProps = {
        fallBackName: fallBackName,
        currentLocale: currentLocale,
        phoneNumber: fallBackNumber,
        nameMatches: [],
        onMute: function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt('return', activeCallControl.mute(sessionId));

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          function onMute() {
            return _ref3.apply(this, arguments);
          }

          return onMute;
        }(),
        onUnmute: function () {
          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt('return', activeCallControl.unmute(sessionId));

                  case 1:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          function onUnmute() {
            return _ref4.apply(this, arguments);
          }

          return onUnmute;
        }(),
        onHold: function () {
          var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt('return', activeCallControl.hold(sessionId));

                  case 1:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this2);
          }));

          function onHold() {
            return _ref5.apply(this, arguments);
          }

          return onHold;
        }(),
        onUnhold: function () {
          var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt('return', activeCallControl.unHold(sessionId));

                  case 1:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this2);
          }));

          function onUnhold() {
            return _ref6.apply(this, arguments);
          }

          return onUnhold;
        }(),
        onHangup: function () {
          var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt('return', activeCallControl.hangUp(sessionId));

                  case 1:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this2);
          }));

          function onHangup() {
            return _ref7.apply(this, arguments);
          }

          return onHangup;
        }(),
        onTransfer: function () {
          var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(number) {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt('return', activeCallControl.transfer(number, sessionId));

                  case 1:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this2);
          }));

          function onTransfer(_x) {
            return _ref8.apply(this, arguments);
          }

          return onTransfer;
        }(),
        showBackButton: true,
        backButtonLabel: _i18n2.default.getString('allCalls', currentLocale),
        onBackButtonClick: function () {
          var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    return _context7.abrupt('return', routerInteraction.goBack());

                  case 1:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee7, _this2);
          }));

          function onBackButtonClick() {
            return _ref9.apply(this, arguments);
          }

          return onBackButtonClick;
        }(),
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber2.default)({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode
          });
        },
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        selectedMatcherIndex: 0,
        onSelectMatcherName: function onSelectMatcherName() {
          return null;
        },
        searchContactList: this.props.searchContactList,
        searchContact: function searchContact(value) {
          return _this2.props.searchContact(value);
        },
        layout: _callCtrlLayouts2.default.normalCtrl,
        startTime: activeCall.startTime,
        actions: [muteCtrl, transferCtrl, holdCtrl],
        isOnMute: activeSession.isOnMute,
        isOnHold: activeSession.isOnHold
      };

      var uselessProps = {
        recordStatus: '',
        onRecord: function onRecord() {
          return null;
        },
        onStopRecord: function onStopRecord() {
          return null;
        },
        onAdd: function onAdd() {
          return null;
        },
        onMerge: function onMerge() {
          return null;
        },
        onFlip: function onFlip() {
          return null;
        },
        onPark: function onPark() {
          return null;
        },
        onKeyPadChange: function onKeyPadChange() {
          return null;
        }
      };

      var props = (0, _extends3.default)({}, callCtrlProps, uselessProps);

      return _react2.default.createElement(_CallCtrlPanel2.default, props);
    }
  }]);
  return ActiveCallControl;
}(_react.Component);

ActiveCallControl.propTypes = {
  currentLocale: _propTypes2.default.string,
  activeCallControl: _propTypes2.default.object,
  regionSettings: _propTypes2.default.object,
  callMonitor: _propTypes2.default.object,
  alert: _propTypes2.default.object,
  routerInteraction: _propTypes2.default.object,
  searchContact: _propTypes2.default.func,
  searchContactList: _propTypes2.default.array,
  renderContactName: _propTypes2.default.func
};

ActiveCallControl.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  regionSettings: {},
  callMonitor: {},
  alert: {},
  routerInteraction: {},
  searchContact: function searchContact() {},

  searchContactList: [],
  renderContactName: function renderContactName() {}
};

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ActiveCallControl));
//# sourceMappingURL=index.js.map
