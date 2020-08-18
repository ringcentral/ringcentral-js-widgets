"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("ringcentral-integration/lib/RcModule"));

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _moduleStatuses = _interopRequireDefault(require("ringcentral-integration/enums/moduleStatuses"));

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _baseMessageTypes = require("../AdapterCore/baseMessageTypes");

var _baseActionTypes = require("./baseActionTypes");

var _getDefaultGlobalStorageReducer = _interopRequireDefault(require("./getDefaultGlobalStorageReducer"));

var _IframeMessageTransport = _interopRequireDefault(require("../IframeMessageTransport"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var AdapterModuleCoreBase = (_dec = (0, _di.Module)({
  deps: ['GlobalStorage', 'Locale', 'Presence', 'RouterInteraction', 'Storage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(AdapterModuleCoreBase, _RcModule);

  var _super = _createSuper(AdapterModuleCoreBase);

  function AdapterModuleCoreBase(_ref) {
    var _this;

    var prefix = _ref.prefix,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? 'adapterCore' : _ref$storageKey,
        _ref$messageTypes = _ref.messageTypes,
        messageTypes = _ref$messageTypes === void 0 ? _baseMessageTypes.baseMessageTypes : _ref$messageTypes,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? _baseActionTypes.baseActionTypes : _ref$actionTypes,
        globalStorage = _ref.globalStorage,
        locale = _ref.locale,
        presence = _ref.presence,
        routerInteraction = _ref.routerInteraction,
        _ref$getGlobalStorage = _ref.getGlobalStorageReducer,
        getGlobalStorageReducer = _ref$getGlobalStorage === void 0 ? _getDefaultGlobalStorageReducer["default"] : _ref$getGlobalStorage,
        _ref$messageTransport = _ref.messageTransport,
        messageTransport = _ref$messageTransport === void 0 ? new _IframeMessageTransport["default"]({
      targetWindow: window.parent
    }) : _ref$messageTransport,
        options = _objectWithoutProperties(_ref, ["prefix", "storageKey", "messageTypes", "actionTypes", "globalStorage", "locale", "presence", "routerInteraction", "getGlobalStorageReducer", "messageTransport"]);

    _classCallCheck(this, AdapterModuleCoreBase);

    _this = _super.call(this, _objectSpread({
      prefix: prefix,
      actionTypes: actionTypes
    }, options));
    _this._messageTypes = _ObjectMap.ObjectMap.prefixValues(messageTypes, prefix);
    _this._locale = _ensureExist["default"].call(_assertThisInitialized(_this), locale, 'locale');
    _this._messageTransport = _ensureExist["default"].call(_assertThisInitialized(_this), messageTransport, 'messageTransport');
    _this._presence = _ensureExist["default"].call(_assertThisInitialized(_this), presence, 'presence');
    _this._router = _ensureExist["default"].call(_assertThisInitialized(_this), routerInteraction, 'routerInteraction');
    _this._storageKey = storageKey;
    _this._globalStorage = _ensureExist["default"].call(_assertThisInitialized(_this), globalStorage, 'globalStorage');

    _this._globalStorage.registerReducer({
      key: _this._storageKey,
      reducer: getGlobalStorageReducer(_this.actionTypes)
    });

    return _this;
  }

  _createClass(AdapterModuleCoreBase, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this._messageTransport.addListener(function (msg) {
        return _this2._onMessage(msg);
      });

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._globalStorage.ready && this._locale.ready && this._router.ready;
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });

        this._pushAdapterState();

        this._pushOtherStateChanges();

        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      }

      this._pushPresence();

      this._pushLocale();

      this._pushOtherStateChanges();
    }
  }, {
    key: "_pushOtherStateChanges",
    value: function _pushOtherStateChanges() {
      console.log('implement to handle other state changes pushing.');
    }
  }, {
    key: "_pushPresence",
    value: function _pushPresence() {
      if (this.ready && (this._lastDndStatus !== this._presence.dndStatus || this._lastUserStatus !== this._presence.userStatus || this._lastTelephonyStatus !== this._presence.telephonyStatus)) {
        this._lastDndStatus = this._presence.dndStatus;
        this._lastUserStatus = this._presence.userStatus;
        this._lastTelephonyStatus = this._presence.telephonyStatus;

        this._postMessage({
          type: this._messageTypes.pushPresence,
          telephonyStatus: this._presence.telephonyStatus,
          userStatus: this._presence.userStatus,
          dndStatus: this._presence.dndStatus,
          presenceOption: this._presence.presenceOption
        });
      }
    }
  }, {
    key: "_pushLocale",
    value: function _pushLocale() {
      if (this.ready && this._locale.ready && this._lastLocale !== this._locale.currentLocale) {
        this._lastLocale = this._locale.currentLocale;

        this._postMessage({
          type: this._messageTypes.pushLocale,
          locale: this._locale.currentLocale,
          strings: this.localeStrings
        });
      }
    }
  }, {
    key: "_postMessage",
    value: function _postMessage(data) {
      this._messageTransport.postMessage(data);
    }
  }, {
    key: "_pushAdapterState",
    value: function _pushAdapterState() {
      if (this.ready && (this._lastDndStatus !== this._presence.dndStatus || this._lastUserStatus !== this._presence.userStatus || this._lastTelephonyStatus !== this._presence.telephonyStatus || this._lastClosed !== this.closed || this._lastMinimized !== this.minimized || this._lastPosition.translateX !== this.position.translateX || this._lastPosition.translateY !== this.position.translateY || this._lastPosition.minTranslateX !== this.position.minTranslateX || this._lastPosition.minTranslateY !== this.position.minTranslateY)) {
        this._lastDndStatus = this._presence.dndStatus;
        this._lastUserStatus = this._presence.userStatus;
        this._lastTelephonyStatus = this._presence.telephonyStatus;
        this._lastClosed = this.closed;
        this._lastMinimized = this.minimized;
        this._lastPosition = this.position;

        this._postMessage({
          type: this._messageTypes.pushAdapterState,
          size: this.size,
          minimized: this.minimized,
          closed: this.closed,
          position: this.position,
          telephonyStatus: this._presence.telephonyStatus,
          userStatus: this._presence.userStatus,
          dndStatus: this._presence.dndStatus
        });
      }
    }
  }, {
    key: "_onMessage",
    value: function _onMessage(msg) {
      if (msg) {
        switch (msg.type) {
          case this._messageTypes.syncClosed:
            this._syncClosed(msg.closed);

            break;

          case this._messageTypes.syncMinimized:
            this._syncMinimized(msg.minimized);

            break;

          case this._messageTypes.syncSize:
            this._syncSize(msg.size);

            break;

          case this._messageTypes.syncPosition:
            this._syncPosition(msg.position);

            break;

          case this._messageTypes.presenceItemClicked:
            this._onPresenceItemClicked(msg.presenceType);

            break;

          case this._messageTypes.navigateToCurrentCall:
            this._onNavigateToCurrentCall();

            break;

          case this._messageTypes.navigateToViewCalls:
            this._onNavigateToViewCalls();

            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "_syncClosed",
    value: function () {
      var _syncClosed2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(closed) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.syncClosed,
                  closed: closed
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _syncClosed(_x) {
        return _syncClosed2.apply(this, arguments);
      }

      return _syncClosed;
    }()
  }, {
    key: "_syncMinimized",
    value: function () {
      var _syncMinimized2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(minimized) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.syncMinimized,
                  minimized: minimized
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _syncMinimized(_x2) {
        return _syncMinimized2.apply(this, arguments);
      }

      return _syncMinimized;
    }()
  }, {
    key: "_syncSize",
    value: function () {
      var _syncSize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var size,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                size = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                this.store.dispatch({
                  type: this.actionTypes.syncSize,
                  size: size
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _syncSize() {
        return _syncSize2.apply(this, arguments);
      }

      return _syncSize;
    }()
  }, {
    key: "_syncPosition",
    value: function () {
      var _syncPosition2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var position,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                position = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                this.store.dispatch({
                  type: this.actionTypes.syncPosition,
                  position: position
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _syncPosition() {
        return _syncPosition2.apply(this, arguments);
      }

      return _syncPosition;
    }()
  }, {
    key: "_onPresenceItemClicked",
    value: function () {
      var _onPresenceItemClicked2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(presenceData) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._presence.setPresence(presenceData);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _onPresenceItemClicked(_x3) {
        return _onPresenceItemClicked2.apply(this, arguments);
      }

      return _onPresenceItemClicked;
    }()
  }, {
    key: "showAdapter",
    value: function () {
      var _showAdapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.showAdapter
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function showAdapter() {
        return _showAdapter.apply(this, arguments);
      }

      return showAdapter;
    }()
  }, {
    key: "_onNavigateToCurrentCall",
    value: function () {
      var _onNavigateToCurrentCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                throw new Error('Should implement the _onNavigateToCurrentCall function.');

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function _onNavigateToCurrentCall() {
        return _onNavigateToCurrentCall2.apply(this, arguments);
      }

      return _onNavigateToCurrentCall;
    }()
  }, {
    key: "_onNavigateToViewCalls",
    value: function () {
      var _onNavigateToViewCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                throw new Error('Should implement the _onNavigateToViewCalls function.');

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function _onNavigateToViewCalls() {
        return _onNavigateToViewCalls2.apply(this, arguments);
      }

      return _onNavigateToViewCalls;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "minimized",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).minimized;
    }
  }, {
    key: "closed",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).closed;
    }
  }, {
    key: "size",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).size;
    }
  }, {
    key: "position",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).position;
    }
  }]);

  return AdapterModuleCoreBase;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_syncClosed", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncClosed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncMinimized", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncSize", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncPosition", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onPresenceItemClicked", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onPresenceItemClicked"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAdapter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAdapter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToCurrentCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToCurrentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToViewCalls", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToViewCalls"), _class2.prototype)), _class2)) || _class);
exports["default"] = AdapterModuleCoreBase;
//# sourceMappingURL=index.js.map
