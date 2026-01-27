"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.index-of.js");
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
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _excluded = ["allowDuplicates"],
  _excluded2 = ["id", "ttl"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
var DEFAULT_CLOSE_TIMEOUT = 5000;

/**
 * when you not need listen any change or call back, use that will be easier
 */

var DEFAULT_DISMISS_GROUP = 'default';
var Toast = exports.Toast = (_dec = (0, _nextCore.injectable)({
  name: 'Toast'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ToastOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _nextCore.PortalHost === "undefined" ? Object : _nextCore.PortalHost, typeof ToastOptions === "undefined" ? Object : ToastOptions]), _dec5 = Reflect.metadata("design:type", Array), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Object, typeof ToastOnCloseType === "undefined" ? Object : ToastOnCloseType]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Object, typeof ToastOnCloseType === "undefined" ? Object : ToastOnCloseType]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String, typeof ToastOnCloseType === "undefined" ? Object : ToastOnCloseType]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Array]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String, String, typeof Record === "undefined" ? Object : Record]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [String, typeof ToastOnCloseType === "undefined" ? Object : ToastOnCloseType]), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = (0, _nextCore.computed)(function (that) {
  return [that._toasts];
}), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Toast(_storage, _portalHost, _toastOptions) {
    var _this;
    _classCallCheck(this, Toast);
    _this = _callSuper(this, Toast);
    _this._storage = _storage;
    _this._portalHost = _portalHost;
    _this._toastOptions = _toastOptions;
    _initializerDefineProperty(_this, "_toasts", _descriptor, _this);
    _initializerDefineProperty(_this, "_normalToast", _descriptor2, _this);
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(Toast, _RcModule);
  return _createClass(Toast, [{
    key: "_ttl",
    get: function get() {
      var _this$_toastOptions$t, _this$_toastOptions;
      return (_this$_toastOptions$t = (_this$_toastOptions = this._toastOptions) === null || _this$_toastOptions === void 0 ? void 0 : _this$_toastOptions.ttl) !== null && _this$_toastOptions$t !== void 0 ? _this$_toastOptions$t : DEFAULT_CLOSE_TIMEOUT;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._dismissExpired();
    }

    /**
     * Scans the messages for expired ones and dismiss them.
     */
  }, {
    key: "_dismissExpired",
    value: function _dismissExpired() {
      var _this2 = this;
      var now = Date.now();
      var dismissIds = this._toasts.reduce(function (acc, curr) {
        var ttl = curr.ttl,
          timestamp = curr.timestamp,
          id = curr.id;
        var expiredTimestamp = timestamp + ttl;
        var expired = now >= expiredTimestamp;
        if (expired) {
          acc.push(id);
          return acc;
        }
        var remainingTime = expiredTimestamp - now;
        _this2._waitToastClose(id, remainingTime);
        return acc;
      }, []);
      dismissIds.forEach(function (id) {
        return _this2._removeToast(id);
      });
      this._portalHost.removeIdTypeCacheMaps(dismissIds);
    }

    /**
     * create a toast instance for using in multiple tab.
     *
     * @param options target view and props
     * @returns toast instance
     *
     * @example
     * ```tsx
     * toast = this._toast.create({
     *  view: this._customView, // view with ToastRef implement
     *  props: () => ({
     *    disableBackdropClick: false,
     *    onClose: (e, reason) => {
     *      console.log('onClose', reason);
     *    },
     *  }),
     *});
     * ```
     * ## that must be done before or inside constructor, we must keep that instance otherwise when in multiple tab mode can't find target toast anymore.
     *
     */
  }, {
    key: "create",
    value: function create(options) {
      var toastInstance = new _nextCore.DehydratedPortal(options, {
        level: 'info',
        ttl: this._ttl,
        loading: false,
        backdrop: false
      });
      return toastInstance;
    }

    /**
     * open target toast cross multiple tabs
     *
     * ```ts
     * this._toast.open(toastInstance, {
     *    value: 'some value you want to pass once, those once pass will never be update during this toast open'
     * })
     * ```
     * @param toastInstance host toast instance
     * @param payload JSON data pass to toast, data must be `serializable`.
     */
  }, {
    key: "open",
    value: function open(toastInstance, payload) {
      var _this3 = this;
      var instance = this._portalHost.open(toastInstance, payload, function () {
        return _this3._addToast.apply(_this3, arguments);
      });
      return _objectSpread(_objectSpread({}, instance), {}, {
        close: function close() {
          _this3.close(instance.id);
        }
      });
    }

    /**
     * simple success toast message,
     *
     * if you need custom jsx or style or listen callback, use open API
     */
  }, {
    key: "success",
    value: function success(options) {
      return this._openNormalToast(_objectSpread(_objectSpread({}, this._getOptions(options)), {}, {
        level: 'success'
      }));
    }

    /**
     * simple danger toast message,
     *
     * if you need custom jsx or style or listen callback, use open API
     */
  }, {
    key: "danger",
    value: function danger(options) {
      return this._openNormalToast(_objectSpread(_objectSpread({}, this._getOptions(options)), {}, {
        level: 'danger'
      }));
    }

    /**
     * simple warning toast message,
     *
     * if you need custom jsx or style or listen callback, use open API
     */
  }, {
    key: "warning",
    value: function warning(options) {
      return this._openNormalToast(_objectSpread(_objectSpread({}, this._getOptions(options)), {}, {
        level: 'warning'
      }));
    }

    /**
     * simple info toast message,
     *
     * if you need custom jsx or style or listen callback, use open API
     */
  }, {
    key: "info",
    value: function info(options) {
      return this._openNormalToast(_objectSpread(_objectSpread({}, this._getOptions(options)), {}, {
        level: 'info'
      }));
    }

    /**
     * simple info toast message,
     *
     * if you need custom jsx or style or listen callback, use open API
     */
  }, {
    key: "hint",
    value: function hint(options) {
      return this._openNormalToast(_objectSpread(_objectSpread({}, this._getOptions(options)), {}, {
        level: 'hint'
      }));
    }
  }, {
    key: "_openNormalToast",
    value: function _openNormalToast(item) {
      var _this4 = this;
      var _item$allowDuplicates = item.allowDuplicates,
        allowDuplicates = _item$allowDuplicates === void 0 ? true : _item$allowDuplicates,
        options = _objectWithoutProperties(item, _excluded);
      if (!allowDuplicates) {
        var instance = this.toasts.find(function (_ref) {
          var message = _ref.message,
            level = _ref.level;
          return options.message === message && options.level === level;
        });
        if (instance) {
          var id = instance.id;
          return {
            id: id,
            closed: this._portalHost.addResolver(id),
            close: function close() {
              _this4.close(id);
            }
          };
        }
      }
      this.logger.log("".concat(item.level, " toast"), item);
      return this.open(this._normalToast, options);
    }

    /**
     * close target toast cross multiple tabs
     *
     * ```ts
     * // remove target id toast
     * this._toast.close(id)
     * // remove all target toast type toasts
     * this._toast.close(toastInstance)
     * ```
     */
  }, {
    key: "close",
    value: (function () {
      var _close2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        var _this5 = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._portalHost.close(this._toasts, value, function (id, reason) {
                return _this5._close(id, reason);
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function close(_x) {
        return _close2.apply(this, arguments);
      }
      return close;
    }()
    /**
     * dismiss target toast by id
     * @param idOrIds toast id or ids to dismiss
     * @param reason reason to dismiss, default is `programmatic`
     */
    )
  }, {
    key: "dismiss",
    value: (function () {
      var _dismiss = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(idOrIds) {
        var _this6 = this;
        var reason,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              reason = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'programmatic';
              if (!Array.isArray(idOrIds)) {
                _context3.n = 3;
                break;
              }
              _context3.n = 1;
              return Promise.all(idOrIds.map(function (id) {
                return _this6._portalHost.resolveFn(id, null);
              }));
            case 1:
              this._removeIds(idOrIds);
              _context3.n = 2;
              return Promise.all(idOrIds.map(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
                  return _regenerator().w(function (_context2) {
                    while (1) switch (_context2.n) {
                      case 0:
                        _context2.n = 1;
                        return _this6._portalHost.callOnEvent(id, 'onClose', reason);
                      case 1:
                        _context2.n = 2;
                        return _this6._portalHost.clearTimer(id);
                      case 2:
                        return _context2.a(2);
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 2:
              return _context3.a(2);
            case 3:
              _context3.n = 4;
              return this._portalHost.resolveFn(idOrIds, null);
            case 4:
              this._close(idOrIds, reason);
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function dismiss(_x2) {
        return _dismiss.apply(this, arguments);
      }
      return dismiss;
    }()
    /**
     * dismiss target toast by group
     *
     * useful when you want to dismiss all toast in a group
     *
     * @example
     * ```ts
     * this._toast.success({ message: 'message1', group: 'group1' })
     * this._toast.danger({ message: 'message1', group: 'group1' })
     * this._toast.info({ message: 'message1', group: 'group1' })
     * this._toast.info({ message: 'message2', group: 'group2' })
     *
     * this._toast.dismissByGroup('*') // all group
     * this._toast.dismissByGroup(['default']) // all default group
     * ```
     *
     * @param group group name to dismiss, default is `default`
     * @param reason reason to dismiss, default is `programmatic`
     */
    )
  }, {
    key: "dismissByGroup",
    value: (function () {
      var _dismissByGroup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var group,
          reason,
          ids,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              group = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : [DEFAULT_DISMISS_GROUP];
              reason = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'programmatic';
              if (!(group === '*')) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this.dismiss(this.toasts.map(function (item) {
                return item.id;
              }), reason);
            case 1:
              return _context4.a(2);
            case 2:
              ids = this.toasts
              // when not set group, will be default
              .filter(function (item) {
                var _item$group;
                return group.includes((_item$group = item.group) !== null && _item$group !== void 0 ? _item$group : DEFAULT_DISMISS_GROUP);
              }).map(function (item) {
                return item.id;
              });
              _context4.n = 3;
              return this.dismiss(ids, reason);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function dismissByGroup() {
        return _dismissByGroup.apply(this, arguments);
      }
      return dismissByGroup;
    }())
  }, {
    key: "dismissAllExpectSpecifiedGroup",
    value: function () {
      var _dismissAllExpectSpecifiedGroup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(group) {
        var reason,
          ids,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              reason = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 'programmatic';
              ids = this.toasts.filter(function (item) {
                return !item.group || item.group !== group;
              }).map(function (item) {
                return item.id;
              });
              _context5.n = 1;
              return this.dismiss(ids, reason);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function dismissAllExpectSpecifiedGroup(_x4) {
        return _dismissAllExpectSpecifiedGroup.apply(this, arguments);
      }
      return dismissAllExpectSpecifiedGroup;
    }()
  }, {
    key: "_removeIds",
    value: function _removeIds(ids) {
      var _this7 = this;
      ids.forEach(function (id) {
        return _this7._removeToast(id);
      });
    }
  }, {
    key: "_addToast",
    value: function () {
      var _addToast2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id, type, payload) {
        var toastInstance, dehydratedState, ttl;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._portalHost.setIdTypeCacheMap(id, type);
              toastInstance = this.getMap(id);
              dehydratedState = toastInstance.getDehydrateState(id, payload);
              this._innerAddToast(_objectSpread(_objectSpread({}, dehydratedState), {}, {
                payload: payload,
                timestamp: Date.now()
              }));
              ttl = dehydratedState.ttl;
              if (ttl > 0) {
                this._waitToastClose(id, ttl);
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _addToast(_x5, _x6, _x7) {
        return _addToast2.apply(this, arguments);
      }
      return _addToast;
    }()
  }, {
    key: "_waitToastClose",
    value: function () {
      var _waitToastClose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, ttl) {
        var _t;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this._portalHost.startTimer(id, ttl);
            case 1:
              _context7.n = 2;
              return this.close(id);
            case 2:
              _context7.n = 4;
              break;
            case 3:
              _context7.p = 3;
              _t = _context7.v;
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 3]]);
      }));
      function _waitToastClose(_x8, _x9) {
        return _waitToastClose2.apply(this, arguments);
      }
      return _waitToastClose;
    }()
  }, {
    key: "_innerAddToast",
    value: function _innerAddToast(toastState) {
      this._toasts.push(toastState);
    }
  }, {
    key: "_close",
    value: function () {
      var _close3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, reason) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._removeToast(id);
              _context8.n = 1;
              return this._portalHost.callOnEvent(id, 'onClose', reason);
            case 1:
              _context8.n = 2;
              return this._portalHost.clearTimer(id);
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _close(_x0, _x1) {
        return _close3.apply(this, arguments);
      }
      return _close;
    }()
  }, {
    key: "_removeToast",
    value: function _removeToast(id) {
      var index = (0, _ramda.findIndex)(function (item) {
        return item.id === id;
      }, this._toasts);
      if (index !== -1) {
        this._toasts.splice(index, 1);
      }
    }
  }, {
    key: "_getOptions",
    value: function _getOptions(options) {
      return typeof options === 'string' ? {
        message: options
      } : options;
    }
  }, {
    key: "getMap",
    value: function getMap(id) {
      return this._portalHost.getMap(id);
    }
  }, {
    key: "toasts",
    get: function get() {
      var _this8 = this;
      return this._toasts.reduce(function (acc, _ref3) {
        var id = _ref3.id,
          ttl = _ref3.ttl,
          rest = _objectWithoutProperties(_ref3, _excluded2);
        var toast = _this8.getMap(id);
        if (toast) {
          var uiProps = _objectSpread(_objectSpread({}, rest), {}, {
            id: id,
            // for hidden toast only inner, so not show in type
            toast: toast,
            onClose: function onClose(reason) {
              _this8.dismiss(id, reason);
            }
          });
          acc.push(uiProps);
        }
        return acc;
      }, []);
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_toasts", [_nextCore.globalStorage, _nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_normalToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this.create({
      props: function props(_props) {
        return _props;
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissByGroup", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissByGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAllExpectSpecifiedGroup", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAllExpectSpecifiedGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeIds", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addToast", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_addToast"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_innerAddToast", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_innerAddToast"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_close", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "_close"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeToast", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeToast"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toasts", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "toasts"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Toast.js.map
