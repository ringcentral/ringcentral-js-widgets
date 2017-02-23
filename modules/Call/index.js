'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _callingModes = require('../CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

var _cleanNumber = require('../../lib/cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

var _parseNumber2 = require('../../lib/parseNumber');

var _parseNumber3 = _interopRequireDefault(_parseNumber2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallReducer = require('./getCallReducer');

var _getCallReducer2 = _interopRequireDefault(_getCallReducer);

var _callStatus = require('./callStatus');

var _callStatus2 = _interopRequireDefault(_callStatus);

var _callErrors = require('./callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

var _ringoutErrors = require('../Ringout/ringoutErrors');

var _ringoutErrors2 = _interopRequireDefault(_ringoutErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Call = function (_RcModule) {
  (0, _inherits3.default)(Call, _RcModule);

  function Call(_ref) {
    var _this2 = this;

    var alert = _ref.alert,
        client = _ref.client,
        storage = _ref.storage,
        regionSettings = _ref.regionSettings,
        callingSettings = _ref.callingSettings,
        softphone = _ref.softphone,
        ringout = _ref.ringout,
        accountExtension = _ref.accountExtension,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'storage', 'regionSettings', 'callingSettings', 'softphone', 'ringout', 'accountExtension']);
    (0, _classCallCheck3.default)(this, Call);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Call.__proto__ || (0, _getPrototypeOf2.default)(Call)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this.onCall = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var validatedNumbers;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.callStatus === _callStatus2.default.idle)) {
                _context.next = 23;
                break;
              }

              if (!(('' + _this.toNumber).trim().length === 0)) {
                _context.next = 5;
                break;
              }

              if (_this.lastCallNumber) {
                _this.onToNumberChange(_this.lastCallNumber);
              } else {
                _this._alert.warning({
                  message: _callErrors2.default.noToNumber
                });
              }
              _context.next = 23;
              break;

            case 5:
              _this.store.dispatch({
                type: _this.actionTypes.connect,
                number: _this.toNumber
              });
              _context.prev = 6;
              _context.next = 9;
              return _this._getValidatedNumbers();

            case 9:
              validatedNumbers = _context.sent;

              if (!validatedNumbers) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return _this._makeCall(validatedNumbers);

            case 13:
              _this.store.dispatch({
                type: _this.actionTypes.connectSuccess
              });
              _context.next = 17;
              break;

            case 16:
              _this.store.dispatch({
                type: _this.actionTypes.connectError
              });

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](6);

              if (_context.t0.message === _ringoutErrors2.default.firstLegConnectFailed) {
                _this._alert.warning({
                  message: _callErrors2.default.connectFailed,
                  payroll: _context.t0
                });
              } else if (_context.t0.message === 'Failed to fetch') {
                _this._alert.danger({
                  message: _callErrors2.default.networkError,
                  payroll: _context.t0
                });
              } else if (_context.t0.message !== 'Refresh token has expired') {
                _this._alert.danger({
                  message: _callErrors2.default.internalError,
                  payroll: _context.t0
                });
              }
              _this.store.dispatch({
                type: _this.actionTypes.connectError
              });

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[6, 19]]);
    }));


    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._storageKey = 'lastCallNumber';
    _this._reducer = (0, _getCallReducer2.default)(_this.actionTypes);
    _this._regionSettings = regionSettings;
    _this._callingSettings = callingSettings;
    _this._ringout = ringout;
    _this._softphone = softphone;
    _this._accountExtension = accountExtension;

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getCallReducer.getLastCallNumberReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(Call, [{
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.store.subscribe(function () {
        if (_this3._regionSettings.ready && _this3._callingSettings.ready && _this3._storage.ready && _this3.status === _moduleStatus2.default.pending) {
          _this3.store.dispatch({
            type: _this3.actionTypes.initSuccess
          });
        } else if ((!_this3._regionSettings.ready || !_this3._callingSettings.ready || !_this3._storage.ready) && _this3.status === _moduleStatus2.default.ready) {
          _this3.store.dispatch({
            type: _this3.actionTypes.resetSuccess
          });
        }
      });
    }
  }, {
    key: 'onToNumberChange',
    value: function onToNumberChange(value) {
      this.store.dispatch({
        type: this.actionTypes.toNumberChanged,
        data: value
      });
    }
  }, {
    key: '_getValidatedNumbers',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var fromNumber, countryCode, areaCode, _parseNumber, hasPlus, number, isServiceNumber, cleaned, normalized, homeCountry, resp, parsedFromNumber;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromNumber = this._callingSettings.myLocation;
                countryCode = this._regionSettings.countryCode;
                areaCode = this._regionSettings.areaCode;
                _parseNumber = (0, _parseNumber3.default)(this.toNumber), hasPlus = _parseNumber.hasPlus, number = _parseNumber.number, isServiceNumber = _parseNumber.isServiceNumber;
                cleaned = (0, _cleanNumber2.default)(this.toNumber);
                // include special char or cleaned has no digit (only #*+)

                if (!((0, _cleanNumber.hasInvalidChar)(this.toNumber) || !(0, _cleanNumber.hasNumber)(cleaned))) {
                  _context2.next = 9;
                  break;
                }

                this._alert.warning({
                  message: _callErrors2.default.noToNumber
                });
                _context2.next = 29;
                break;

              case 9:
                if (!(!isServiceNumber && !hasPlus && number.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode === '')) {
                  _context2.next = 13;
                  break;
                }

                this._alert.warning({
                  message: _callErrors2.default.noAreaCode
                });
                _context2.next = 29;
                break;

              case 13:
                // to e164 normalize
                normalized = (0, _normalizeNumber2.default)({
                  phoneNumber: this.toNumber,
                  countryCode: countryCode,
                  areaCode: areaCode
                });
                // phoneParser

                homeCountry = countryCode ? { homeCountry: countryCode } : {};
                _context2.next = 17;
                return this._client.numberParser().parse().post({
                  originalStrings: [normalized, fromNumber]
                }, homeCountry);

              case 17:
                resp = _context2.sent;

                if (!(resp.phoneNumbers[0] && resp.phoneNumbers[0].special)) {
                  _context2.next = 22;
                  break;
                }

                this._alert.warning({
                  message: _callErrors2.default.specialNumber
                });
                _context2.next = 29;
                break;

              case 22:
                if (!(resp.phoneNumbers[0] && resp.phoneNumbers[0].originalString.length <= 5 && !this._accountExtension.isAvailableExtension(resp.phoneNumbers[0].originalString))) {
                  _context2.next = 26;
                  break;
                }

                // not a service code but short number, confirm if it is an extension
                this._alert.warning({
                  message: _callErrors2.default.notAnExtension
                });
                _context2.next = 29;
                break;

              case 26:
                // using e164 in response to call
                parsedFromNumber = resp.phoneNumbers[1] ? resp.phoneNumbers[1].e164 : '';
                // add ext back if any

                if (parsedFromNumber !== '') {
                  parsedFromNumber = resp.phoneNumbers[1].subAddress ? [resp.phoneNumbers[1].e164, resp.phoneNumbers[1].subAddress].join('*') : resp.phoneNumbers[1].e164;
                }
                return _context2.abrupt('return', {
                  toNumber: resp.phoneNumbers[0].e164,
                  fromNumber: parsedFromNumber
                });

              case 29:
                return _context2.abrupt('return', null);

              case 30:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getValidatedNumbers() {
        return _ref3.apply(this, arguments);
      }

      return _getValidatedNumbers;
    }()
  }, {
    key: '_makeCall',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5) {
        var toNumber = _ref5.toNumber,
            fromNumber = _ref5.fromNumber;
        var callingMode;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                callingMode = this._callingSettings.callingMode;
                _context3.t0 = callingMode;
                _context3.next = _context3.t0 === _callingModes2.default.softphone ? 4 : _context3.t0 === _callingModes2.default.ringout ? 6 : 9;
                break;

              case 4:
                this._softphone.makeCall(toNumber);
                return _context3.abrupt('break', 10);

              case 6:
                _context3.next = 8;
                return this._ringout.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  prompt: this._callingSettings.ringoutPrompt
                });

              case 8:
                return _context3.abrupt('break', 10);

              case 9:
                return _context3.abrupt('break', 10);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _makeCall(_x) {
        return _ref4.apply(this, arguments);
      }

      return _makeCall;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'callStatus',
    get: function get() {
      return this.state.callStatus;
    }
  }, {
    key: 'isIdle',
    get: function get() {
      return this.state.callStatus === _callStatus2.default.idle;
    }
  }, {
    key: 'lastCallNumber',
    get: function get() {
      return this._storage.getItem(this._storageKey) || '';
    }
  }, {
    key: 'toNumber',
    get: function get() {
      return this.state.toNumber;
    }
  }]);
  return Call;
}(_RcModule3.default); // TODO : move to ringcentral-integration


exports.default = Call;
//# sourceMappingURL=index.js.map
