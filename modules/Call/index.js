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

var _dec, _class, _desc, _value, _class2;

var _redux = require('redux');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

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

/**
 * @class
 * @description Call managing module
 */
var Call = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Storage', 'Softphone', 'Ringout', 'NumberValidate', 'RegionSettings', 'CallingSettings', { dep: 'Webphone', optional: true }, { dep: 'CallOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Call, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {CallingSettings} params.callingSettings - callingSettings module instance
   * @param {Softphone} params.softphone - softphone module instance
   * @param {Ringout} params.ringout - ringout module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   */
  function Call(_ref) {
    var alert = _ref.alert,
        storage = _ref.storage,
        callingSettings = _ref.callingSettings,
        softphone = _ref.softphone,
        ringout = _ref.ringout,
        webphone = _ref.webphone,
        numberValidate = _ref.numberValidate,
        regionSettings = _ref.regionSettings,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'storage', 'callingSettings', 'softphone', 'ringout', 'webphone', 'numberValidate', 'regionSettings']);
    (0, _classCallCheck3.default)(this, Call);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Call.__proto__ || (0, _getPrototypeOf2.default)(Call)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._alert = alert;
    _this._storage = storage;
    _this._storageKey = 'callData';
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
      reducer: (0, _redux.combineReducers)({
        lastPhoneNumber: (0, _getCallReducer.getLastPhoneNumberReducer)(_this.actionTypes),
        lastRecipient: (0, _getCallReducer.getLastRecipientReducer)(_this.actionTypes)
      })
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
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref8) {
        var phoneNumber = _ref8.phoneNumber,
            recipient = _ref8.recipient;
        var toNumber, validatedNumbers;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.isIdle) {
                  _context5.next = 25;
                  break;
                }

                toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;

                if (!(!toNumber || ('' + toNumber).trim().length === 0)) {
                  _context5.next = 6;
                  break;
                }

                this._alert.warning({
                  message: _callErrors2.default.noToNumber
                });
                _context5.next = 25;
                break;

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.connect,
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  callSettingMode: this._callSettingMode // for Track
                });
                _context5.prev = 7;
                _context5.next = 10;
                return this._getValidatedNumbers({ toNumber: toNumber });

              case 10:
                validatedNumbers = _context5.sent;

                if (!validatedNumbers) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 14;
                return this._makeCall(validatedNumbers);

              case 14:
                this.store.dispatch({
                  type: this.actionTypes.connectSuccess,
                  callSettingMode: this._callSettingMode // for Track
                });
                _context5.next = 18;
                break;

              case 17:
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

              case 18:
                _context5.next = 25;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5['catch'](7);

                if (!_context5.t0.message) {
                  // validate format error
                  this._alert.warning({
                    message: _callErrors2.default[_context5.t0.type],
                    payload: {
                      phoneNumber: _context5.t0.phoneNumber
                    }
                  });
                } else if (_context5.t0.message === _ringoutErrors2.default.firstLegConnectFailed) {
                  this._alert.warning({
                    message: _callErrors2.default.connectFailed,
                    payload: _context5.t0
                  });
                } else if (_context5.t0.message === 'Failed to fetch') {
                  this._alert.danger({
                    message: _callErrors2.default.networkError,
                    payload: _context5.t0
                  });
                } else if (_context5.t0.message !== 'Refresh token has expired') {
                  this._alert.danger({
                    message: _callErrors2.default.internalError,
                    payload: _context5.t0
                  });
                }
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });
                throw _context5.t0;

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[7, 20]]);
      }));

      function call(_x2) {
        return _ref7.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: '_getValidatedNumbers',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref10) {
        var toNumber = _ref10.toNumber;
        var isWebphone, fromNumber, waitingValidateNumbers, validatedResult, parsedNumbers, parsedFromNumber;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                isWebphone = this._callingSettings.callingMode === _callingModes2.default.webphone;
                fromNumber = isWebphone ? this._callingSettings.fromNumber : this._callingSettings.myLocation;

                if (!(isWebphone && (fromNumber === null || fromNumber === ''))) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt('return', null);

              case 4:
                waitingValidateNumbers = [toNumber];

                if (fromNumber && fromNumber.length > 0 && !(isWebphone && fromNumber === 'anonymous')) {
                  waitingValidateNumbers.push(fromNumber);
                }
                _context6.next = 8;
                return this._numberValidate.validateNumbers(waitingValidateNumbers);

              case 8:
                validatedResult = _context6.sent;

                if (validatedResult.result) {
                  _context6.next = 12;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  // this._alert.warning({
                  //   message: callErrors[error.type],
                  //   payload: {
                  //     phoneNumber: error.phoneNumber
                  //   }
                  // });
                  throw error;
                });
                return _context6.abrupt('return', null);

              case 12:
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
                return _context6.abrupt('return', {
                  toNumber: parsedNumbers[0].e164,
                  fromNumber: parsedFromNumber
                });

              case 17:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _getValidatedNumbers(_x3) {
        return _ref9.apply(this, arguments);
      }

      return _getValidatedNumbers;
    }()
  }, {
    key: '_makeCall',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_ref12) {
        var _this3 = this;

        var toNumber = _ref12.toNumber,
            fromNumber = _ref12.fromNumber,
            _ref12$callingMode = _ref12.callingMode,
            callingMode = _ref12$callingMode === undefined ? this._callingSettings.callingMode : _ref12$callingMode;
        var homeCountry, homeCountryId;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                homeCountry = this._regionSettings.availableCountries.find(function (country) {
                  return country.isoCode === _this3._regionSettings.countryCode;
                });
                homeCountryId = homeCountry && homeCountry.callingCode || '1';
                _context7.t0 = callingMode;
                _context7.next = _context7.t0 === _callingModes2.default.softphone ? 5 : _context7.t0 === _callingModes2.default.ringout ? 7 : _context7.t0 === _callingModes2.default.webphone ? 10 : 14;
                break;

              case 5:
                this._softphone.makeCall(toNumber);
                return _context7.abrupt('break', 15);

              case 7:
                _context7.next = 9;
                return this._ringout.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  prompt: this._callingSettings.ringoutPrompt
                });

              case 9:
                return _context7.abrupt('break', 15);

              case 10:
                if (!this._webphone) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 13;
                return this._webphone.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  homeCountryId: homeCountryId
                });

              case 13:
                return _context7.abrupt('break', 15);

              case 14:
                return _context7.abrupt('break', 15);

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _makeCall(_x4) {
        return _ref11.apply(this, arguments);
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
    key: 'lastPhoneNumber',
    get: function get() {
      return this._storage.getItem(this._storageKey).lastPhoneNumber;
    }
  }, {
    key: 'lastRecipient',
    get: function get() {
      return this._storage.getItem(this._storageKey).lastRecipient;
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
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'onToNumberChange', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onToNumberChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'call', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'call'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_getValidatedNumbers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_getValidatedNumbers'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_makeCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_makeCall'), _class2.prototype)), _class2)) || _class);
exports.default = Call;
//# sourceMappingURL=index.js.map
