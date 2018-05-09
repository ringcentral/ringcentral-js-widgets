'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2, _descriptor;

var _RcModule2 = require('ringcentral-integration/lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('ringcentral-integration/lib/di');

var _ensureExist = require('ringcentral-integration/lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getter = require('ringcentral-integration/lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _reselect = require('reselect');

var _getCallLogSectionReducer = require('./getCallLogSectionReducer');

var _getCallLogSectionReducer2 = _interopRequireDefault(_getCallLogSectionReducer);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var CallLogSection = (_dec = (0, _di.Module)({
  deps: ['Storage']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(CallLogSection, _RcModule);

  function CallLogSection(_ref) {
    var storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage']);
    (0, _classCallCheck3.default)(this, CallLogSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallLogSection.__proto__ || (0, _getPrototypeOf2.default)(CallLogSection)).call(this, (0, _extends3.default)({
      storage: storage,
      actionTypes: _actionTypes2.default
    }, options)));

    _initDefineProp(_this, 'calls', _descriptor, _this);

    _this._storage = storage;
    _this._storageReducer = (0, _getStorageReducer2.default)(_this.actionTypes);
    _this._storageKey = 'callLogSection';
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._storageReducer
    });
    _this._reducer = (0, _getCallLogSectionReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(CallLogSection, [{
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!(typeof this._onInit === 'function')) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._onInit();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 13;
                break;

              case 8:
                if (!this._shouldReset()) {
                  _context.next = 13;
                  break;
                }

                if (!(typeof this._onReset === 'function')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 12;
                return this._onReset();

              case 12:
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });

              case 13:
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
      return this._storage.ready && this._readyCheckFunction() && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._storage.ready || !this._readyCheckFunction()) && this.ready;
    }
  }, {
    key: '_handleSuccess',
    value: function _handleSuccess(identify) {
      this.store.dispatch({
        type: this.actionTypes.saveSuccess,
        identify: identify
      });

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (typeof this._onSuccess === 'function') this._onSuccess.apply(this, [identify].concat(args));
    }
  }, {
    key: '_handleError',
    value: function _handleError(identify) {
      this.store.dispatch({
        type: this.actionTypes.saveError,
        identify: identify
      });

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (typeof this._onError === 'function') this._onError.apply(this, [identify].concat(args));
    }
  }, {
    key: '_showLogSection',
    value: function _showLogSection(identify) {
      if (!this.show || identify !== this.currentIdentify) {
        this.store.dispatch({
          type: this.actionTypes.showLogSection,
          identify: identify
        });
      }
    }
  }, {
    key: '_showLogNotification',
    value: function _showLogNotification(identify) {
      if (!this.showNotification || identify !== this.currentNotificationIdentify) {
        this.store.dispatch({
          type: this.actionTypes.showLogNotification,
          identify: identify
        });
      }
    }
  }, {
    key: 'addLogHandler',
    value: function addLogHandler(_ref3) {
      var logFunction = _ref3.logFunction,
          readyCheckFunction = _ref3.readyCheckFunction,
          onUpdate = _ref3.onUpdate,
          onSuccess = _ref3.onSuccess,
          onError = _ref3.onError;

      this._logFunction = _ensureExist2.default.call(this, logFunction, 'logFunction');
      this._readyCheckFunction = _ensureExist2.default.call(this, readyCheckFunction, 'readyCheckFunction');
      this._onUpdate = onUpdate;
      this._onSuccess = onSuccess;
      this._onError = onError;
    }
  }, {
    key: 'updateCallLog',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(identify) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.update,
                  identify: identify
                });
                _context2.next = 3;
                return this._onUpdate.apply(this, [identify].concat((0, _toConsumableArray3.default)(args)));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateCallLog(_x) {
        return _ref4.apply(this, arguments);
      }

      return updateCallLog;
    }()
  }, {
    key: 'saveCallLog',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(identify) {
        var _len4,
            args,
            _key4,
            result,
            _args3 = arguments;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(identify && (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving))) {
                  _context3.next = 14;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.saving,
                  identify: identify
                });

                for (_len4 = _args3.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = _args3[_key4];
                }

                _context3.prev = 3;
                _context3.next = 6;
                return this._logFunction.apply(this, [identify].concat((0, _toConsumableArray3.default)(args)));

              case 6:
                result = _context3.sent;

                if (result) {
                  this._handleSuccess.apply(this, [identify].concat((0, _toConsumableArray3.default)(args)));
                } else {
                  this._handleError.apply(this, [identify].concat((0, _toConsumableArray3.default)(args)));
                }
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](3);

                this._handleError.apply(this, [identify].concat((0, _toConsumableArray3.default)(args)));
                console.warn(_context3.t0);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 10]]);
      }));

      function saveCallLog(_x2) {
        return _ref5.apply(this, arguments);
      }

      return saveCallLog;
    }()
  }, {
    key: 'handleLogSection',
    value: function handleLogSection(identify) {
      // prevent `isSameCall` for repeat run more time.
      var isSameCall = this.currentIdentify === identify;
      if (!this.show) {
        // Preferentially show call log section.
        this._showLogSection(identify);
      } else if (!this.notificationIsExpand && !isSameCall) {
        // Check it to show log notification when the call log notification isn't expanded.
        this._showLogNotification(identify);
      }
    }
  }, {
    key: 'closeLogSection',
    value: function closeLogSection() {
      if (this.show) {
        this.store.dispatch({
          type: this.actionTypes.closeLogSection
        });
      }
    }
  }, {
    key: 'discardAndHandleNotification',
    value: function discardAndHandleNotification() {
      var currentNotificationIdentify = this.currentNotificationIdentify;
      this.closeLogNotification();
      this.closeLogSection();
      this._showLogSection(currentNotificationIdentify);
    }
  }, {
    key: 'saveAndHandleNotification',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var currentNotificationIdentify, currentIdentify;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentNotificationIdentify = this.currentNotificationIdentify;
                currentIdentify = this.currentIdentify;

                this.closeLogNotification();
                this.closeLogSection();
                _context4.next = 6;
                return this.saveCallLog(currentIdentify);

              case 6:
                this._showLogSection(currentNotificationIdentify);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveAndHandleNotification() {
        return _ref6.apply(this, arguments);
      }

      return saveAndHandleNotification;
    }()
  }, {
    key: 'closeLogNotification',
    value: function closeLogNotification() {
      if (this.showNotification) {
        this.store.dispatch({
          type: this.actionTypes.closeLogNotification
        });
      }
    }
  }, {
    key: 'expandLogNotification',
    value: function expandLogNotification() {
      if (!this.show) {
        this._showLogSection(this.currentNotificationIdentify);
        this.closeLogNotification();
      } else if (!this.notificationIsExpand) {
        this.store.dispatch({
          type: this.actionTypes.expandNotification
        });
      }
    }
  }, {
    key: 'callsList',
    get: function get() {
      return this._storage.getItem(this._storageKey).callsList;
    }
  }, {
    key: 'callsMapping',
    get: function get() {
      return this._storage.getItem(this._storageKey).callsMapping;
    }
  }, {
    key: 'currentIdentify',
    get: function get() {
      return this._storage.getItem(this._storageKey).currentIdentify;
    }
  }, {
    key: 'show',
    get: function get() {
      return !!this.currentIdentify;
    }
  }, {
    key: 'currentNotificationIdentify',
    get: function get() {
      return this._storage.getItem(this._storageKey).currentNotificationIdentify;
    }
  }, {
    key: 'showNotification',
    get: function get() {
      return !!this.currentNotificationIdentify;
    }
  }, {
    key: 'notificationIsExpand',
    get: function get() {
      return this._storage.getItem(this._storageKey).notificationIsExpand;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return CallLogSection;
}(_RcModule3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'calls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return (0, _reselect.createSelector)(function () {
      return _this2.callsList;
    }, function () {
      return _this2.callsMapping;
    }, function (list, mapping) {
      return list.map(function (identify) {
        return mapping[identify];
      });
    });
  }
})), _class2)) || _class);
exports.default = CallLogSection;
//# sourceMappingURL=index.js.map
