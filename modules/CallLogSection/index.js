"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("ringcentral-integration/lib/RcModule"));

var _di = require("ringcentral-integration/lib/di");

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _selector = require("ringcentral-integration/lib/selector");

var _getCallLogSectionReducer = _interopRequireDefault(require("./getCallLogSectionReducer"));

var _getStorageReducer = _interopRequireDefault(require("./getStorageReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var CallLogSection = (_dec = (0, _di.Module)({
  deps: ['Storage']
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(CallLogSection, _RcModule);

  function CallLogSection(_ref) {
    var _this;

    var storage = _ref.storage,
        options = _objectWithoutProperties(_ref, ["storage"]);

    _classCallCheck(this, CallLogSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallLogSection).call(this, _objectSpread({
      storage: storage,
      actionTypes: _actionTypes["default"]
    }, options)));

    _initializerDefineProperty(_this, "calls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callsMapping", _descriptor2, _assertThisInitialized(_this));

    _this._storage = storage;
    _this._storageReducer = (0, _getStorageReducer["default"])(_this.actionTypes);
    _this._storageKey = 'callLogSection';

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._storageReducer
    });

    _this._reducer = (0, _getCallLogSectionReducer["default"])(_this.actionTypes);
    return _this;
  }

  _createClass(CallLogSection, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._storage.ready && this._readyCheckFunction() && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._storage.ready || !this._readyCheckFunction()) && this.ready;
    }
  }, {
    key: "_handleSuccess",
    value: function _handleSuccess(identify) {
      this.store.dispatch({
        type: this.actionTypes.saveSuccess,
        identify: identify
      });

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (typeof this._onSuccess === 'function') this._onSuccess.apply(this, [identify].concat(args));
    }
  }, {
    key: "_handleError",
    value: function _handleError(identify) {
      this.store.dispatch({
        type: this.actionTypes.saveError,
        identify: identify
      });

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (typeof this._onError === 'function') this._onError.apply(this, [identify].concat(args));
    }
  }, {
    key: "_showLogSection",
    value: function _showLogSection(identify) {
      if (!this.show || identify !== this.currentIdentify) {
        this.store.dispatch({
          type: this.actionTypes.showLogSection,
          identify: identify
        });
      }
    }
  }, {
    key: "_showLogNotification",
    value: function _showLogNotification(identify) {
      if (!this.showNotification || identify !== this.currentNotificationIdentify) {
        this.store.dispatch({
          type: this.actionTypes.showLogNotification,
          identify: identify
        });
      }
    }
  }, {
    key: "addLogHandler",
    value: function addLogHandler(_ref2) {
      var logFunction = _ref2.logFunction,
          readyCheckFunction = _ref2.readyCheckFunction,
          onUpdate = _ref2.onUpdate,
          onSuccess = _ref2.onSuccess,
          onError = _ref2.onError;
      this._logFunction = _ensureExist["default"].call(this, logFunction, 'logFunction');
      this._readyCheckFunction = _ensureExist["default"].call(this, readyCheckFunction, 'readyCheckFunction');
      this._onUpdate = onUpdate;
      this._onSuccess = onSuccess;
      this._onError = onError;
    }
  }, {
    key: "updateCallLog",
    value: function () {
      var _updateCallLog = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(identify) {
        var _len3,
            args,
            _key3,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.update,
                  identify: identify
                });

                for (_len3 = _args2.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = _args2[_key3];
                }

                _context2.next = 4;
                return this._onUpdate.apply(this, [identify].concat(args));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateCallLog(_x) {
        return _updateCallLog.apply(this, arguments);
      }

      return updateCallLog;
    }()
  }, {
    key: "saveCallLog",
    value: function () {
      var _saveCallLog = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(identify) {
        var _len4,
            args,
            _key4,
            result,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(identify && (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving))) {
                  _context3.next = 15;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.saving,
                  identify: identify
                });

                for (_len4 = _args3.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = _args3[_key4];
                }

                _context3.prev = 3;
                _context3.next = 6;
                return this._logFunction.apply(this, [identify].concat(args));

              case 6:
                result = _context3.sent;

                if (result) {
                  this._handleSuccess.apply(this, [identify].concat(args));
                } else {
                  this._handleError.apply(this, [identify].concat(args));
                }

                return _context3.abrupt("return", result);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](3);

                this._handleError.apply(this, [identify].concat(args));

                console.warn(_context3.t0);

              case 15:
                return _context3.abrupt("return", null);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 11]]);
      }));

      function saveCallLog(_x2) {
        return _saveCallLog.apply(this, arguments);
      }

      return saveCallLog;
    }()
  }, {
    key: "handleLogSection",
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
    key: "closeLogSection",
    value: function closeLogSection() {
      if (this.show) {
        this.store.dispatch({
          type: this.actionTypes.closeLogSection
        });
      }
    }
  }, {
    key: "discardAndHandleNotification",
    value: function discardAndHandleNotification() {
      var currentNotificationIdentify = this.currentNotificationIdentify;
      this.closeLogNotification();
      this.closeLogSection();

      this._showLogSection(currentNotificationIdentify);
    }
  }, {
    key: "saveAndHandleNotification",
    value: function () {
      var _saveAndHandleNotification = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var currentNotificationIdentify, currentIdentify;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentNotificationIdentify = this.currentNotificationIdentify;
                currentIdentify = this.currentIdentify;
                _context4.next = 4;
                return this.saveCallLog(currentIdentify);

              case 4:
                this.closeLogNotification();
                this.closeLogSection();

                this._showLogSection(currentNotificationIdentify);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveAndHandleNotification() {
        return _saveAndHandleNotification.apply(this, arguments);
      }

      return saveAndHandleNotification;
    }()
  }, {
    key: "closeLogNotification",
    value: function closeLogNotification() {
      if (this.showNotification) {
        this.store.dispatch({
          type: this.actionTypes.closeLogNotification
        });
      }
    }
  }, {
    key: "expandLogNotification",
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
    key: "callsList",
    get: function get() {
      return this._storage.getItem(this._storageKey).callsList;
    }
    /**
     * Private calls mapping relationship without isSaving property
     */

  }, {
    key: "_callsMapping",
    get: function get() {
      return this._storage.getItem(this._storageKey).callsMapping;
    }
  }, {
    key: "_callsSavingStatus",
    get: function get() {
      return this.state.callsSavingStatus;
    }
  }, {
    key: "currentIdentify",
    get: function get() {
      return this._storage.getItem(this._storageKey).currentIdentify;
    }
  }, {
    key: "show",
    get: function get() {
      return !!this.currentIdentify;
    }
  }, {
    key: "currentNotificationIdentify",
    get: function get() {
      return this._storage.getItem(this._storageKey).currentNotificationIdentify;
    }
  }, {
    key: "showNotification",
    get: function get() {
      return !!this.currentNotificationIdentify;
    }
  }, {
    key: "notificationIsExpand",
    get: function get() {
      return this._storage.getItem(this._storageKey).notificationIsExpand;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return CallLogSection;
}(_RcModule2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.callsList;
    }, function () {
      return _this2.callsMapping;
    }, function (list, mapping) {
      return list.map(function (identify) {
        return mapping[identify];
      });
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3._callsMapping;
    }, function () {
      return _this3._callsSavingStatus;
    }, (0, _ramda.converge)((0, _ramda.mergeWith)((0, _ramda.flip)((0, _ramda.assoc)('isSaving'))), [_ramda.identity, (0, _ramda.useWith)(_ramda.pick, [_ramda.keys, _ramda.identity])])];
  }
})), _class2)) || _class);
exports["default"] = CallLogSection;
//# sourceMappingURL=index.js.map
