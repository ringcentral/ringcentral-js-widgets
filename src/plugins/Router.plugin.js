"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RouterOptions", {
  enumerable: true,
  get: function get() {
    return _reactantShare.RouterOptions;
  }
});
exports.RouterPlugin = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _reactantShare = require("reactant-share");
var _reactantWeb = require("reactant-web");
var _lib = require("../lib");
var _storage = require("../lib/decorators/storage");
var _modules = require("../modules");
var _Storage = require("./Storage.plugin");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var RouterPlugin = exports.RouterPlugin = (_dec = (0, _reactantShare.injectable)({
  name: 'Router'
}), _dec2 = function _dec2(target, key) {
  return (0, _reactantShare.inject)(_reactantShare.SharedAppOptions)(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _reactantShare.inject)(_reactantShare.RouterOptions)(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _Storage.StoragePlugin === "undefined" ? Object : _Storage.StoragePlugin, typeof _modules.PortManager === "undefined" ? Object : _modules.PortManager, typeof _reactantShare.PortDetector === "undefined" ? Object : _reactantShare.PortDetector, typeof ISharedAppOptions === "undefined" ? Object : ISharedAppOptions, typeof IRouterOptions === "undefined" ? Object : IRouterOptions]), _dec6 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_BaseRouter) {
  function RouterPlugin(storage, portManager, portDetector, sharedAppOptions, options) {
    var _this;
    _classCallCheck(this, RouterPlugin);
    _this = _callSuper(this, RouterPlugin, [portDetector, sharedAppOptions, options]);
    _this.storage = storage;
    _this.portManager = portManager;
    _this.portDetector = portDetector;
    _this.sharedAppOptions = sharedAppOptions;
    _this.options = options;
    _this.callbackSet = new Set();
    _initializerDefineProperty(_this, "_routers", _descriptor, _this);
    if (_this.options.enableCache) {
      _this.storage.enable(_this);
    }
    (0, _reactantShare.watch)(_this, function () {
      return _this.currentPath;
    }, function (currentPath) {
      _this.callbackSet.forEach(function (callback) {
        return callback(currentPath);
      });
    });
    _this.portManager.onMainTab(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var fn, _this$portDetector$tr;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _this.portDetector.syncFullStatePromise;
          case 1:
            if (!_this.portManager.isWorkerMode) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return _this.portDetector.syncFullStatePromise;
          case 2:
            if (_this.toBeRouted) {
              fn = _this.toBeRouted;
              _this.toBeRouted = null;
              fn();
            } else {
              // if server port is ready, but client port is not ready.
              (_this$portDetector$tr = _this.portDetector.transports.client) === null || _this$portDetector$tr === void 0 ? void 0 : _this$portDetector$tr.emit('@@reactant:syncRouter', _this.portDetector.name, _this.lastRoutedTimestamp, _this.router).then(function (routeState) {
                if (routeState && _this.compareRouter(routeState, _this.router)) {
                  (0, _reactantShare.getRef)(_this).store.dispatch(_this.onLocationChanged(routeState, 'REPLACE'));
                }
              });
            }
          case 3:
            return _context.a(2);
        }
      }, _callee);
    })));
    return _this;
  }
  _inherits(RouterPlugin, _BaseRouter);
  return _createClass(RouterPlugin, [{
    key: "setCurrentPathWithoutLocationChange",
    value:
    /**
     * change router inner state without router change
     *
     * ## should only use that before reload page, that will make inner router state be different real browser location state
     */
    function setCurrentPathWithoutLocationChange(pathname) {
      this._routers[this.portDetector.name].location.pathname = pathname;
    }

    /**
     * when you want to using params as `@computed` listener, using that to get correct result.
     *
     * > `useConnector` is a connector to Redux store, that will be calculate before component `re-render`, if your computed listener values have not redux state, must using that to get correct computed result.
     */
  }, {
    key: "useParams",
    value: function useParams(callback) {
      var _this2 = this;
      var match = (0, _reactantWeb.useRouteMatch)();

      // * only callback when first render
      (0, _react.useMemo)(function () {
        callback(match.params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      (0, _react.useEffect)(function () {
        /**
         * when re-render using watch callback to get params
         */
        var listener = function listener(currentPath) {
          var result = (0, _reactantWeb.matchPath)(currentPath, {
            path: match.path,
            exact: match.isExact,
            strict: true
          });
          if (result) {
            callback(result.params);
          }
        };
        _this2.callbackSet.add(listener);
        return function () {
          _this2.callbackSet["delete"](listener);
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []);
    }
  }]);
}(_reactantShare.Router), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_routers", [_storage.storage, _reactantShare.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _defineProperty({}, this.portDetector.name, this.router);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCurrentPathWithoutLocationChange", [_lib.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentPathWithoutLocationChange"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Router.plugin.js.map
