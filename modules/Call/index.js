'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _desc, _value, _class;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _callingModes = require('../CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Call = (_class = function (_RcModule) {
  (0, _inherits3.default)(Call, _RcModule);

  function Call(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        storage = _ref.storage,
        callingSettings = _ref.callingSettings,
        softphone = _ref.softphone,
        ringout = _ref.ringout,
        webphone = _ref.webphone,
        numberValidate = _ref.numberValidate,
        regionSettings = _ref.regionSettings,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'storage', 'callingSettings', 'softphone', 'ringout', 'webphone', 'numberValidate', 'regionSettings']);
    (0, _classCallCheck3.default)(this, Call);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Call.__proto__ || (0, _getPrototypeOf2.default)(Call)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._storageKey = 'lastCallNumber';
    _this._reducer = (0, _getCallReducer2.default)(_this.actionTypes);
    _this._callingSettings = callingSettings;
    _this._ringout = ringout;
    _this._softphone = softphone;
    _this._webphone = webphone;
    _this._numberValidate = numberValidate;
    _this._regionSettings = regionSettings;
    _this._callSettingMode = null;

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getCallReducer.getLastCallNumberReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(Call, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 7;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context.next = 4;
                return this._initCallModule();

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 14;
                break;

              case 7:
                if (!this._shouldReset()) {
                  _context.next = 11;
                  break;
                }

                this._resetCallModule();
                _context.next = 14;
                break;

              case 11:
                if (!this.ready) {
                  _context.next = 14;
                  break;
                }

                _context.next = 14;
                return this._processCall();

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._numberValidate.ready && this._callingSettings.ready && this._storage.ready && this._regionSettings.ready && (!this._webphone || this._webphone.ready) && this._ringout.ready && this._softphone.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._numberValidate.ready || !this._callingSettings.ready || !this._regionSettings.ready || !!this._webphone && !this._webphone.ready || !this._ringout.ready || !this._softphone.ready || !this._storage.ready) && this.ready;
    }
  }, {
    key: '_initCallModule',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._callSettingMode = this._callingSettings.callingMode;

                if (!(this._callSettingMode === _callingModes2.default.webphone && this._webphone)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return this._webphone.connect();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _initCallModule() {
        return _ref3.apply(this, arguments);
      }

      return _initCallModule;
    }()
  }, {
    key: '_resetCallModule',
    value: function _resetCallModule() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
      this._callSettingMode = this._callingSettings.callingMode;
      if (this._callSettingMode === _callingModes2.default.webphone && this._webphone) {
        this._webphone.disconnect();
      }
    }
  }, {
    key: '_processCall',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var oldCallSettingMode;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                oldCallSettingMode = this._callSettingMode;

                if (!(this._callingSettings.callingMode !== oldCallSettingMode && this._webphone)) {
                  _context3.next = 10;
                  break;
                }

                this._callSettingMode = this._callingSettings.callingMode;

                if (!(oldCallSettingMode === _callingModes2.default.webphone)) {
                  _context3.next = 7;
                  break;
                }

                this._webphone.disconnect();
                _context3.next = 10;
                break;

              case 7:
                if (!(this._callSettingMode === _callingModes2.default.webphone)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return this._webphone.connect();

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _processCall() {
        return _ref4.apply(this, arguments);
      }

      return _processCall;
    }()
  }, {
    key: 'onToNumberChange',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(value) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.toNumberChanged,
                  data: value
                });

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onToNumberChange(_x) {
        return _ref5.apply(this, arguments);
      }

      return onToNumberChange;
    }()

    // save the click to dial entity, only when call took place

  }, {
    key: 'onToNumberMatch',
    value: function onToNumberMatch(_ref6) {
      var entityId = _ref6.entityId,
          startTime = _ref6.startTime;

      if (this.isIdle) {
        this.store.dispatch({
          type: this.actionTypes.toNumberMatched,
          data: { entityId: entityId, startTime: startTime }
        });
      }
    }
  }, {
    key: 'cleanToNumberEntities',
    value: function cleanToNumberEntities() {
      this.store.dispatch({
        type: this.actionTypes.cleanToNumberEntities
      });
    }
  }, {
    key: 'call',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(number) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.onToNumberChange(number);
                _context5.next = 3;
                return this.onCall();

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function call(_x2) {
        return _ref7.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: 'onCall',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var validatedNumbers;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.isIdle) {
                  _context6.next = 23;
                  break;
                }

                if (!(('' + this.toNumber).trim().length === 0)) {
                  _context6.next = 5;
                  break;
                }

                if (this.lastCallNumber) {
                  this.onToNumberChange(this.lastCallNumber);
                } else {
                  this._alert.warning({
                    message: _callErrors2.default.noToNumber
                  });
                }
                _context6.next = 23;
                break;

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.connect,
                  number: this.toNumber,
                  callSettingMode: this._callSettingMode // for Track
                });
                _context6.prev = 6;
                _context6.next = 9;
                return this._getValidatedNumbers();

              case 9:
                validatedNumbers = _context6.sent;

                if (!validatedNumbers) {
                  _context6.next = 16;
                  break;
                }

                _context6.next = 13;
                return this._makeCall(validatedNumbers);

              case 13:
                this.store.dispatch({
                  type: this.actionTypes.connectSuccess
                });
                _context6.next = 17;
                break;

              case 16:
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

              case 17:
                _context6.next = 23;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6['catch'](6);

                if (_context6.t0.message === _ringoutErrors2.default.firstLegConnectFailed) {
                  this._alert.warning({
                    message: _callErrors2.default.connectFailed,
                    payload: _context6.t0
                  });
                } else if (_context6.t0.message === 'Failed to fetch') {
                  this._alert.danger({
                    message: _callErrors2.default.networkError,
                    payload: _context6.t0
                  });
                } else if (_context6.t0.message !== 'Refresh token has expired') {
                  this._alert.danger({
                    message: _callErrors2.default.internalError,
                    payload: _context6.t0
                  });
                }
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

              case 23:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 19]]);
      }));

      function onCall() {
        return _ref8.apply(this, arguments);
      }

      return onCall;
    }()
  }, {
    key: '_getValidatedNumbers',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        var _this3 = this;

        var fromNumber, isWebphone, waitingValidateNumbers, validatedResult, parsedNumbers, parsedFromNumber;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                fromNumber = void 0;
                isWebphone = this._callingSettings.callingMode === _callingModes2.default.webphone;

                if (!isWebphone) {
                  _context7.next = 8;
                  break;
                }

                fromNumber = this._callingSettings.fromNumber;

                if (!(fromNumber === null || fromNumber === '')) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt('return', null);

              case 6:
                _context7.next = 9;
                break;

              case 8:
                fromNumber = this._callingSettings.myLocation;

              case 9:
                waitingValidateNumbers = [this.toNumber];

                if (fromNumber && fromNumber.length > 0 && !(isWebphone && fromNumber === 'anonymous')) {
                  waitingValidateNumbers.push(fromNumber);
                }
                _context7.next = 13;
                return this._numberValidate.validateNumbers(waitingValidateNumbers);

              case 13:
                validatedResult = _context7.sent;

                if (validatedResult.result) {
                  _context7.next = 17;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  _this3._alert.warning({
                    message: _callErrors2.default[error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context7.abrupt('return', null);

              case 17:
                parsedNumbers = validatedResult.numbers;
                // using e164 in response to call

                parsedFromNumber = parsedNumbers[1] ? parsedNumbers[1].e164 : '';
                // add ext back if any

                if (parsedFromNumber !== '') {
                  parsedFromNumber = parsedNumbers[1].subAddress ? [parsedNumbers[1].e164, parsedNumbers[1].subAddress].join('*') : parsedNumbers[1].e164;
                }
                if (isWebphone && fromNumber === 'anonymous') {
                  parsedFromNumber = 'anonymous';
                }
                return _context7.abrupt('return', {
                  toNumber: parsedNumbers[0].e164,
                  fromNumber: parsedFromNumber
                });

              case 22:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _getValidatedNumbers() {
        return _ref9.apply(this, arguments);
      }

      return _getValidatedNumbers;
    }()
  }, {
    key: '_makeCall',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(_ref11) {
        var toNumber = _ref11.toNumber,
            fromNumber = _ref11.fromNumber;
        var callingMode, countryCode, homeCountry, homeCountryId;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                callingMode = this._callingSettings.callingMode;
                countryCode = this._regionSettings.countryCode;
                homeCountry = this._regionSettings.availableCountries.find(function (country) {
                  return country.isoCode === countryCode;
                });
                homeCountryId = homeCountry && homeCountry.callingCode || '1';
                _context8.t0 = callingMode;
                _context8.next = _context8.t0 === _callingModes2.default.softphone ? 7 : _context8.t0 === _callingModes2.default.ringout ? 9 : _context8.t0 === _callingModes2.default.webphone ? 12 : 16;
                break;

              case 7:
                this._softphone.makeCall(toNumber);
                return _context8.abrupt('break', 17);

              case 9:
                _context8.next = 11;
                return this._ringout.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  prompt: this._callingSettings.ringoutPrompt
                });

              case 11:
                return _context8.abrupt('break', 17);

              case 12:
                if (!this._webphone) {
                  _context8.next = 15;
                  break;
                }

                _context8.next = 15;
                return this._webphone.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  homeCountryId: homeCountryId
                });

              case 15:
                return _context8.abrupt('break', 17);

              case 16:
                return _context8.abrupt('break', 17);

              case 17:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _makeCall(_x3) {
        return _ref10.apply(this, arguments);
      }

      return _makeCall;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.pending;
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
  }, {
    key: 'toNumberEntities',
    get: function get() {
      return this.state.toNumberEntities;
    }
  }]);
  return Call;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'onToNumberChange', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onToNumberChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'call', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'call'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onCall'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getValidatedNumbers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_getValidatedNumbers'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_makeCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_makeCall'), _class.prototype)), _class);
exports.default = Call;
//# sourceMappingURL=index.js.map
