"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _uuid = require("uuid");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _alertLevels = require("./alertLevels");
var _dec, _class, _class2, _descriptor;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var Alert = (_dec = (0, _di.Module)({
  name: 'Alert',
  deps: ['GlobalStorage', {
    dep: 'AlertOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Alert, _RcModuleV);
  var _super = _createSuper(Alert);
  function Alert(deps) {
    var _deps$alertOptions$tt, _deps$alertOptions, _deps$alertOptions$en, _deps$alertOptions2;
    var _this;
    _classCallCheck(this, Alert);
    _this = _super.call(this, {
      deps: _objectSpread(_objectSpread({}, deps), {}, {
        alertOptions: _objectSpread(_objectSpread({}, deps.alertOptions), {}, {
          ttl: (_deps$alertOptions$tt = (_deps$alertOptions = deps.alertOptions) === null || _deps$alertOptions === void 0 ? void 0 : _deps$alertOptions.ttl) !== null && _deps$alertOptions$tt !== void 0 ? _deps$alertOptions$tt : 5000
        })
      }),
      enableGlobalCache: (_deps$alertOptions$en = (_deps$alertOptions2 = deps.alertOptions) === null || _deps$alertOptions2 === void 0 ? void 0 : _deps$alertOptions2.enableTabSync) !== null && _deps$alertOptions$en !== void 0 ? _deps$alertOptions$en : false,
      storageKey: 'alert'
    });
    _initializerDefineProperty(_this, "messages", _descriptor, _assertThisInitialized(_this));
    /**
     * Scans the messages for expired ones and dismiss them.
     */
    _this._autoDismiss = function () {
      var now = Date.now();
      var ids = _this.messages.filter(function (item) {
        return item.ttl > 0 && now - item.timestamp > item.ttl;
      }).map(function (item) {
        return item.id;
      });
      if (ids.length) {
        _this.dismiss(ids);
      }
    };
    return _this;
  }
  _createClass(Alert, [{
    key: "_alert",
    value: function _alert(_ref) {
      var allowDuplicates = _ref.allowDuplicates,
        item = _objectWithoutProperties(_ref, ["allowDuplicates"]);
      if (!allowDuplicates && this.messages.find(function (_ref2) {
        var message = _ref2.message,
          level = _ref2.level;
        return item.message === message && item.level === level;
      })) {
        return;
      }
      this.messages.push(item);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this$_deps$alertOpti,
        _this2 = this;
      if ((_this$_deps$alertOpti = this._deps.alertOptions) === null || _this$_deps$alertOpti === void 0 ? void 0 : _this$_deps$alertOpti.enableTabSync) {
        this.messages.forEach(function (_ref3) {
          var ttl = _ref3.ttl;
          setTimeout(_this2._autoDismiss, ttl + 10);
        });
      }
    }
  }, {
    key: "alert",
    /**
     * Add alert message to the state.
     */
    value: function () {
      var _alert2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
        var _this$_deps$alertOpti2;
        var message, payload, _ref4$level, level, _ref4$ttl, ttl, _ref4$allowDuplicates, allowDuplicates, _ref4$loading, loading, _ref4$backdrop, backdrop, classes, onBackdropClick, _ref4$action, action, id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                message = _ref4.message, payload = _ref4.payload, _ref4$level = _ref4.level, level = _ref4$level === void 0 ? _alertLevels.alertLevels.info : _ref4$level, _ref4$ttl = _ref4.ttl, ttl = _ref4$ttl === void 0 ? this._deps.alertOptions.ttl : _ref4$ttl, _ref4$allowDuplicates = _ref4.allowDuplicates, allowDuplicates = _ref4$allowDuplicates === void 0 ? true : _ref4$allowDuplicates, _ref4$loading = _ref4.loading, loading = _ref4$loading === void 0 ? false : _ref4$loading, _ref4$backdrop = _ref4.backdrop, backdrop = _ref4$backdrop === void 0 ? false : _ref4$backdrop, classes = _ref4.classes, onBackdropClick = _ref4.onBackdropClick, _ref4$action = _ref4.action, action = _ref4$action === void 0 ? (_this$_deps$alertOpti2 = this._deps.alertOptions) === null || _this$_deps$alertOpti2 === void 0 ? void 0 : _this$_deps$alertOpti2.action : _ref4$action;
                id = (0, _uuid.v4)();
                this._alert({
                  message: message,
                  payload: payload,
                  level: level,
                  // when loading the ttl will be zero, make this never dismiss
                  ttl: loading ? 0 : ttl,
                  allowDuplicates: allowDuplicates,
                  backdrop: backdrop,
                  classes: classes,
                  onBackdropClick: onBackdropClick,
                  id: id,
                  timestamp: Date.now(),
                  loading: loading,
                  action: action
                });
                if (ttl > 0) {
                  setTimeout(this._autoDismiss, ttl + 10);
                }
                return _context.abrupt("return", id);
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function alert(_x) {
        return _alert2.apply(this, arguments);
      }
      return alert;
    }()
    /**
     * Add alert message of alertLevel "danger" to the state.
     */
  }, {
    key: "danger",
    value: function danger(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.danger
      }));
    }
    /**
     * Add alert message of alertLevel "warning" to the state.
     */
  }, {
    key: "warning",
    value: function warning(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.warning
      }));
    }
    /**
     * Add alert message of alertLevel "info" to the state.
     */
  }, {
    key: "info",
    value: function info(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.info
      }));
    }
    /**
     * Add alert message of alertLevel "success" to the state.
     */
  }, {
    key: "success",
    value: function success(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.success
      }));
    }
    /**
     * Update the message with given id.
     */
  }, {
    key: "update",
    value: function update(id, options) {
      var message = this.messages.find(function (item) {
        return item.id === id;
      });
      if (message) {
        Object.assign(message, options);
      }
    }
    /**
     * Dismiss the messages/message
     */
  }, {
    key: "dismiss",
    value: function () {
      var _dismiss2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ids) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._dismiss(ids);
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function dismiss(_x2) {
        return _dismiss2.apply(this, arguments);
      }
      return dismiss;
    }()
    /**
     * Dismiss all messages.
     */
  }, {
    key: "dismissAll",
    value: function () {
      var _dismissAll2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._dismissAll();
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function dismissAll() {
        return _dismissAll2.apply(this, arguments);
      }
      return dismissAll;
    }()
    /**
     * Dismiss all other messages expect some specified message.
     */
  }, {
    key: "dismissAllExpectSpecified",
    value: function dismissAllExpectSpecified(_ref5) {
      var _this3 = this;
      var specifiedAlertIds = _ref5.specifiedAlertIds;
      var messages = [];
      specifiedAlertIds.forEach(function (specifiedAlertId) {
        var message = _this3.messages.find(function (item) {
          return item.id === specifiedAlertId;
        });
        if (message) messages.push(message);
      });
      this.messages = messages;
    }
  }, {
    key: "_dismiss",
    value: function _dismiss(ids) {
      var _ids = [].concat(ids);
      this.messages = this.messages.filter(function (item) {
        return _ids.indexOf(item.id) === -1;
      });
    }
  }, {
    key: "_dismissAll",
    value: function _dismissAll() {
      this.messages = [];
    }
  }]);
  return Alert;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "messages", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_alert", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAll", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAllExpectSpecified", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAllExpectSpecified"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_dismiss", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_dismissAll", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_dismissAll"), _class2.prototype)), _class2)) || _class);
exports.Alert = Alert;
//# sourceMappingURL=Alert.js.map
