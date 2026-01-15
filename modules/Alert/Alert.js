"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _uuid = require("uuid");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _alertLevels = require("./alertLevels");
var _excluded = ["allowDuplicates"];
var _dec, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var Alert = exports.Alert = (_dec = (0, _di.Module)({
  name: 'Alert',
  deps: ['GlobalStorage', {
    dep: 'AlertOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Alert(deps) {
    var _deps$alertOptions$tt, _deps$alertOptions, _deps$alertOptions$en, _deps$alertOptions2;
    var _this;
    _classCallCheck(this, Alert);
    _this = _callSuper(this, Alert, [{
      deps: _objectSpread(_objectSpread({}, deps), {}, {
        alertOptions: _objectSpread(_objectSpread({}, deps.alertOptions), {}, {
          ttl: (_deps$alertOptions$tt = (_deps$alertOptions = deps.alertOptions) === null || _deps$alertOptions === void 0 ? void 0 : _deps$alertOptions.ttl) !== null && _deps$alertOptions$tt !== void 0 ? _deps$alertOptions$tt : 5000
        })
      }),
      enableGlobalCache: (_deps$alertOptions$en = (_deps$alertOptions2 = deps.alertOptions) === null || _deps$alertOptions2 === void 0 ? void 0 : _deps$alertOptions2.enableTabSync) !== null && _deps$alertOptions$en !== void 0 ? _deps$alertOptions$en : false,
      storageKey: 'alert'
    }]);
    _initializerDefineProperty(_this, "messages", _descriptor, _this);
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
  _inherits(Alert, _RcModuleV);
  return _createClass(Alert, [{
    key: "_alert",
    value: function _alert(_ref) {
      var allowDuplicates = _ref.allowDuplicates,
        item = _objectWithoutProperties(_ref, _excluded);
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
    value: (
    /**
     * Add alert message to the state.
     */
    function () {
      var _alert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref4) {
        var _this$_deps$alertOpti2;
        var message, payload, _ref4$level, level, _ref4$ttl, ttl, _ref4$allowDuplicates, allowDuplicates, _ref4$loading, loading, _ref4$backdrop, backdrop, classes, onBackdropClick, _ref4$action, action, id;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
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
              return _context.a(2, id);
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
    )
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
    value: (function () {
      var _dismiss2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ids) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._dismiss(ids);
            case 1:
              return _context2.a(2);
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
    )
  }, {
    key: "dismissAll",
    value: (function () {
      var _dismissAll2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._dismissAll();
            case 1:
              return _context3.a(2);
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
    )
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
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "messages", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_alert", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAll", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAllExpectSpecified", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAllExpectSpecified"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_dismiss", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_dismissAll", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_dismissAll"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Alert.js.map
