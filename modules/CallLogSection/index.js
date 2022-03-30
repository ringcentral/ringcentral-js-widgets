"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _ensureExist = _interopRequireDefault(require("@ringcentral-integration/commons/lib/ensureExist"));

var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");

var _RcModule2 = _interopRequireDefault(require("@ringcentral-integration/commons/lib/RcModule"));

var _selector = require("@ringcentral-integration/commons/lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCallLogSectionReducer = _interopRequireDefault(require("./getCallLogSectionReducer"));

var _getStorageReducer = _interopRequireDefault(require("./getStorageReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var CallLogSection = (_dec = (0, _di.Module)({
  deps: ['Storage', {
    dep: 'CallLogSectionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(CallLogSection, _RcModule);

  var _super = _createSuper(CallLogSection);

  function CallLogSection(_ref) {
    var _this;

    var storage = _ref.storage,
        _ref$notSyncOpenState = _ref.notSyncOpenState,
        notSyncOpenState = _ref$notSyncOpenState === void 0 ? false : _ref$notSyncOpenState,
        options = _objectWithoutProperties(_ref, ["storage", "notSyncOpenState"]);

    _classCallCheck(this, CallLogSection);

    _this = _super.call(this, _objectSpread({
      storage: storage,
      actionTypes: _actionTypes["default"]
    }, options));
    _this._notSyncOpenState = void 0;
    _this._storageKey = void 0;
    _this._storageReducer = void 0;

    _initializerDefineProperty(_this, "calls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callsMapping", _descriptor2, _assertThisInitialized(_this));

    _this._storage = storage;
    _this._notSyncOpenState = notSyncOpenState;
    _this._storageReducer = (0, _getStorageReducer["default"])(_this.actionTypes, notSyncOpenState);
    _this._storageKey = 'callLogSection';

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._storageReducer
    });

    _this._reducer = (0, _getCallLogSectionReducer["default"])(_this.actionTypes, notSyncOpenState);
    return _this;
  }

  _createClass(CallLogSection, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    value: function () {
      var _showLogSection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(identify) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.show || identify !== this.currentIdentify) {
                  this.store.dispatch({
                    type: this.actionTypes.showLogSection,
                    identify: identify
                  });
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _showLogSection(_x) {
        return _showLogSection2.apply(this, arguments);
      }

      return _showLogSection;
    }()
  }, {
    key: "_showLogNotification",
    value: function () {
      var _showLogNotification2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(identify) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.showNotification || identify !== this.currentNotificationIdentify) {
                  this.store.dispatch({
                    type: this.actionTypes.showLogNotification,
                    identify: identify
                  });
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _showLogNotification(_x2) {
        return _showLogNotification2.apply(this, arguments);
      }

      return _showLogNotification;
    }()
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
      var _updateCallLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(identify) {
        var _len3,
            args,
            _key3,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.update,
                  identify: identify
                });

                for (_len3 = _args4.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = _args4[_key3];
                }

                _context4.next = 4;
                return this._onUpdate.apply(this, [identify].concat(args));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateCallLog(_x3) {
        return _updateCallLog.apply(this, arguments);
      }

      return updateCallLog;
    }()
  }, {
    key: "saveCallLog",
    value: function () {
      var _saveCallLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(identify) {
        var _len4,
            args,
            _key4,
            result,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(identify && (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving))) {
                  _context5.next = 15;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.saving,
                  identify: identify
                });

                for (_len4 = _args5.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  args[_key4 - 1] = _args5[_key4];
                }

                _context5.prev = 3;
                _context5.next = 6;
                return this._logFunction.apply(this, [identify].concat(args));

              case 6:
                result = _context5.sent;

                if (result) {
                  this._handleSuccess.apply(this, [identify].concat(args));
                } else {
                  this._handleError.apply(this, [identify].concat(args));
                }

                return _context5.abrupt("return", result);

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](3);

                this._handleError.apply(this, [identify].concat(args));

                console.warn(_context5.t0);

              case 15:
                return _context5.abrupt("return", null);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 11]]);
      }));

      function saveCallLog(_x4) {
        return _saveCallLog.apply(this, arguments);
      }

      return saveCallLog;
    }()
  }, {
    key: "handleLogSection",
    value: function () {
      var _handleLogSection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(identify) {
        var isSameCall;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // prevent `isSameCall` for repeat run more time.
                isSameCall = this.currentIdentify === identify;

                if (this.show) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 4;
                return this._showLogSection(identify);

              case 4:
                _context6.next = 9;
                break;

              case 6:
                if (!(!this.notificationIsExpand && !isSameCall)) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 9;
                return this._showLogNotification(identify);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function handleLogSection(_x5) {
        return _handleLogSection.apply(this, arguments);
      }

      return handleLogSection;
    }()
  }, {
    key: "closeLogSection",
    value: function () {
      var _closeLogSection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.show) {
                  this.store.dispatch({
                    type: this.actionTypes.closeLogSection
                  });
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function closeLogSection() {
        return _closeLogSection.apply(this, arguments);
      }

      return closeLogSection;
    }()
  }, {
    key: "discardAndHandleNotification",
    value: function () {
      var _discardAndHandleNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var currentNotificationIdentify;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                currentNotificationIdentify = this.currentNotificationIdentify;
                _context8.next = 3;
                return this.closeLogNotification();

              case 3:
                _context8.next = 5;
                return this.closeLogSection();

              case 5:
                _context8.next = 7;
                return this._showLogSection(currentNotificationIdentify);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function discardAndHandleNotification() {
        return _discardAndHandleNotification.apply(this, arguments);
      }

      return discardAndHandleNotification;
    }()
  }, {
    key: "saveAndHandleNotification",
    value: function () {
      var _saveAndHandleNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var currentNotificationIdentify, currentIdentify;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                currentNotificationIdentify = this.currentNotificationIdentify;
                currentIdentify = this.currentIdentify;
                _context9.next = 4;
                return this.saveCallLog(currentIdentify);

              case 4:
                _context9.next = 6;
                return this.closeLogNotification();

              case 6:
                _context9.next = 8;
                return this.closeLogSection();

              case 8:
                _context9.next = 10;
                return this._showLogSection(currentNotificationIdentify);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function saveAndHandleNotification() {
        return _saveAndHandleNotification.apply(this, arguments);
      }

      return saveAndHandleNotification;
    }()
  }, {
    key: "closeLogNotification",
    value: function () {
      var _closeLogNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.showNotification) {
                  this.store.dispatch({
                    type: this.actionTypes.closeLogNotification
                  });
                }

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function closeLogNotification() {
        return _closeLogNotification.apply(this, arguments);
      }

      return closeLogNotification;
    }() // shrink the popover menu appear when click log button at call notificaiton

  }, {
    key: "shrinkNotification",
    value: function () {
      var _shrinkNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.notificationIsExpand) {
                  this.store.dispatch({
                    type: this.actionTypes.shrinkNotification
                  });
                }

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function shrinkNotification() {
        return _shrinkNotification.apply(this, arguments);
      }

      return shrinkNotification;
    }()
  }, {
    key: "expandLogNotification",
    value: function () {
      var _expandLogNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.show) {
                  _context12.next = 7;
                  break;
                }

                _context12.next = 3;
                return this._showLogSection(this.currentNotificationIdentify);

              case 3:
                _context12.next = 5;
                return this.closeLogNotification();

              case 5:
                _context12.next = 8;
                break;

              case 7:
                if (!this.notificationIsExpand) {
                  this.store.dispatch({
                    type: this.actionTypes.expandNotification
                  });
                }

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function expandLogNotification() {
        return _expandLogNotification.apply(this, arguments);
      }

      return expandLogNotification;
    }()
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
    key: "_storageCurrentIdentify",
    get: function get() {
      return this._storage.getItem(this._storageKey).currentIdentify;
    }
  }, {
    key: "_stateCurrentIdentify",
    get: function get() {
      return this.state.currentIdentify;
    }
  }, {
    key: "currentIdentify",
    get: function get() {
      return this._notSyncOpenState ? this._stateCurrentIdentify : this._storageCurrentIdentify;
    }
  }, {
    key: "show",
    get: function get() {
      return !!this.currentIdentify;
    }
  }, {
    key: "_storageCurrentNotificationIdentify",
    get: function get() {
      return this._storage.getItem(this._storageKey).currentNotificationIdentify;
    }
  }, {
    key: "_stateCurrentNotificationIdentify",
    get: function get() {
      return this.state.currentNotificationIdentify;
    }
  }, {
    key: "currentNotificationIdentify",
    get: function get() {
      return this._notSyncOpenState ? this._stateCurrentNotificationIdentify : this._storageCurrentNotificationIdentify;
    }
  }, {
    key: "showNotification",
    get: function get() {
      return !!this.currentNotificationIdentify;
    }
  }, {
    key: "_storageNotificationIsExpand",
    get: function get() {
      return this._storage.getItem(this._storageKey).notificationIsExpand;
    }
  }, {
    key: "_stateNotificationIsExpand",
    get: function get() {
      return this.state.notificationIsExpand;
    }
  }, {
    key: "notificationIsExpand",
    get: function get() {
      return this._notSyncOpenState ? this._stateNotificationIsExpand : this._storageNotificationIsExpand;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return CallLogSection;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_showLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_showLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_showLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_showLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCallLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveCallLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "discardAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "discardAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shrinkNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "shrinkNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "expandLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "expandLogNotification"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
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
      var a = list.map(function (identify) {
        return mapping[identify];
      });
      console.log('calls', a);
      return a;
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
    }, (0, _ramda.converge)((0, _ramda.mergeWith)((0, _ramda.flip)((0, _ramda.assoc)('isSaving'))), [_ramda.identity, // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _ramda.useWith)(_ramda.pick, [_ramda.keys, _ramda.identity])])];
  }
})), _class2)) || _class);
exports["default"] = CallLogSection;
//# sourceMappingURL=index.js.map
