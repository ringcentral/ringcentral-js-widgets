"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalHost = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _reactantShare = require("reactant-share");
var _uuid = require("uuid");
var _lib = require("../../lib");
var _Storage = require("../../plugins/Storage.plugin");
var _Initiator = require("../Initiator");
var _PortManager = require("../PortManager");
var _utils2 = require("./utils");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor, _descriptor2;
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var _resolveFn = '$$__resolveFn__$$';
var PortalHost = exports.PortalHost = (_dec = (0, _reactantShare.injectable)({
  name: 'PortalHost'
}), _dec2 = function _dec2(target, key) {
  return (0, _reactantShare.optional)('PortalHostOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _PortManager.PortManager === "undefined" ? Object : _PortManager.PortManager, typeof _Initiator.Initiator === "undefined" ? Object : _Initiator.Initiator, typeof _Storage.StoragePlugin === "undefined" ? Object : _Storage.StoragePlugin, typeof PortalHostOptions === "undefined" ? Object : PortalHostOptions]), _dec5 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec6 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String, String]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String, String]), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [Array]), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Array]), _dec13 = (0, _lib.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Array]), _dec16 = (0, _lib.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = (0, _lib.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [String, typeof PortalHostResolveData === "undefined" ? Object : PortalHostResolveData]), _dec24 = (0, _lib.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [String, Number]), _dec27 = (0, _lib.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [String]), _dec30 = (0, _lib.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [String, String, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function PortalHost(_portManager, _initiator, _storage, _portalHostOptions) {
    var _this;
    _classCallCheck(this, PortalHost);
    _this = _callSuper(this, PortalHost);
    _this._portManager = _portManager;
    _this._initiator = _initiator;
    _this._storage = _storage;
    _this._portalHostOptions = _portalHostOptions;
    _this._timerCancelMap = new Map();
    _this._typeMap = new Map();
    _this._resolveFnMap = new Map();
    _initializerDefineProperty(_this, "_idTypeMap", _descriptor, _this);
    _initializerDefineProperty(_this, "_idTypeCacheMap", _descriptor2, _this);
    _this._storage.enable(_this);
    _this._initiator.beforeInit(function (target) {
      _this._init(target);
    });
    return _this;
  }
  _inherits(PortalHost, _RcModule);
  return _createClass(PortalHost, [{
    key: "setIdTypeCacheMap",
    value:
    /**
     * when you need keep that in storage,
     * and do something when reopen, using `setIdTypeCacheMap` to keep it
     */
    function setIdTypeCacheMap(id, type) {
      this._idTypeCacheMap[id] = type;
    }

    /**
     * if you not need any cache, set that in normal state.
     * and do something when reopen, using `setIdTypeCacheMap` instead
     */
  }, {
    key: "setIdTypeMap",
    value: function setIdTypeMap(id, type) {
      this._idTypeMap[id] = type;
    }
  }, {
    key: "_removeIdTypeMaps",
    value: function _removeIdTypeMaps(ids) {
      var _this2 = this;
      ids.forEach(function (id) {
        delete _this2._idTypeMap[id];
        delete _this2._idTypeCacheMap[id];
      });
    }
  }, {
    key: "_removeIdTypeCacheMaps",
    value: function _removeIdTypeCacheMaps(ids) {
      var _this3 = this;
      ids.forEach(function (id) {
        delete _this3._idTypeCacheMap[id];
      });
    }
  }, {
    key: "removeIdTypeCacheMaps",
    value: function () {
      var _removeIdTypeCacheMaps2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ids) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._removeIdTypeCacheMaps(ids);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function removeIdTypeCacheMaps(_x) {
        return _removeIdTypeCacheMaps2.apply(this, arguments);
      }
      return removeIdTypeCacheMaps;
    }()
  }, {
    key: "clearIdTypeMaps",
    value: function () {
      var _clearIdTypeMaps2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._clearIdTypeMaps();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function clearIdTypeMaps() {
        return _clearIdTypeMaps2.apply(this, arguments);
      }
      return clearIdTypeMaps;
    }()
  }, {
    key: "_clearIdTypeMaps",
    value: function _clearIdTypeMaps() {
      this._idTypeMap = {};
      this._idTypeCacheMap = {};
    }
  }, {
    key: "_init",
    value: function _init(target) {
      var _this4 = this;
      var modalKeys = target[_utils2.portalKey];
      if (!modalKeys) return;
      var _getRef = (0, _reactantShare.getRef)(target),
        identifier = _getRef.identifier;
      modalKeys.forEach(function (key) {
        var portalInstance = target[key];
        var type = "".concat(identifier, ".").concat(key);
        portalInstance.type = type;
        _this4._typeMap.set(type, portalInstance);
      });
    }
  }, {
    key: "open",
    value: function open(toastInstance, payload, addItem) {
      // in shared mode, payload must be serializable
      if (process.env.NODE_ENV !== 'production') {
        try {
          JSON.stringify(payload);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('[PortalHost]', {
            error: error,
            payload: payload
          });
          throw new Error('[PortalHost] payload must be serializable');
        }
      }
      var id = (0, _uuid.v4)();
      var type = toastInstance.type;
      addItem(id, type, payload);
      var closed = this.addResolver(id);
      return {
        id: id,
        closed: closed
      };
    }
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(items, value, remove) {
        var _this5 = this;
        var removeId, type, closeModals;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              removeId = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.n) {
                      case 0:
                        _context3.n = 1;
                        return _this5.resolveFn(id, null);
                      case 1:
                        _context3.n = 2;
                        return remove(id, 'programmatic');
                      case 2:
                        return _context3.a(2);
                    }
                  }, _callee3);
                }));
                return function removeId(_x5) {
                  return _ref.apply(this, arguments);
                };
              }();
              if (!(value instanceof _utils2.DehydratedPortal)) {
                _context4.n = 1;
                break;
              }
              type = value.type;
              closeModals = (0, _ramda.filter)(function (item) {
                var model = _this5.getMap(item.id);
                return (model === null || model === void 0 ? void 0 : model.type) === type;
              }, items);
              closeModals.forEach(function (modal) {
                removeId(modal.id);
              });
              return _context4.a(2);
            case 1:
              _context4.n = 2;
              return removeId(value);
            case 2:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      function close(_x2, _x3, _x4) {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }, {
    key: "resolveFn",
    value: function () {
      var _resolveFn2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id, resolveState) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this[_resolveFn](id, resolveState);
              if (!this._portManager.shared) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return (0, _reactantShare.fork)(this, _resolveFn, [id, resolveState], {
                respond: false
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function resolveFn(_x6, _x7) {
        return _resolveFn2.apply(this, arguments);
      }
      return resolveFn;
    }()
  }, {
    key: _resolveFn,
    value: function value(id, resolveState) {
      var resolve = this._resolveFnMap.get(id);
      resolve === null || resolve === void 0 ? void 0 : resolve(resolveState);
    }
  }, {
    key: "startTimer",
    value: function () {
      var _startTimer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id, ms) {
        var sleepPromise, _t;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              sleepPromise = (0, _utils.sleep)(ms);
              this._timerCancelMap.set(id, function () {
                return sleepPromise.cancel();
              });
              _context6.p = 1;
              _context6.n = 2;
              return sleepPromise;
            case 2:
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t = _context6.v;
              throw new Error('ttl be cancel');
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function startTimer(_x8, _x9) {
        return _startTimer.apply(this, arguments);
      }
      return startTimer;
    }()
  }, {
    key: "clearTimer",
    value: function () {
      var _clearTimer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id) {
        var cancel;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              cancel = this._timerCancelMap.get(id);
              if (cancel) {
                cancel();
                this._timerCancelMap["delete"](id);
              }
              this._removeIdTypeMaps([id]);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function clearTimer(_x0) {
        return _clearTimer.apply(this, arguments);
      }
      return clearTimer;
    }()
  }, {
    key: "callOnEvent",
    value: function () {
      var _callOnEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, eventName) {
        var _modal$handlerRegiste;
        var modal,
          _len,
          args,
          _key,
          _console,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              modal = this.getMap(id); // show warning, user should confirm that warning why trigger
              for (_len = _args8.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = _args8[_key];
              }
              if (process.env.NODE_ENV !== 'production' && !modal) {
                (_console = console).warn.apply(_console, ['[PortalHost] Event emit failed, that maybe error logic in your call event, or jest async event between client and server communication,\nargs: ' + eventName].concat(args));
              }
              modal === null || modal === void 0 ? void 0 : (_modal$handlerRegiste = modal.handlerRegister.get(eventName)) === null || _modal$handlerRegiste === void 0 ? void 0 : _modal$handlerRegiste.apply(void 0, args);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function callOnEvent(_x1, _x10) {
        return _callOnEvent.apply(this, arguments);
      }
      return callOnEvent;
    }()
  }, {
    key: "getMap",
    value: function getMap(id) {
      var type = this._idTypeMap[id];
      var cacheType = this._idTypeCacheMap[id];
      return this._typeMap.get(type || cacheType);
    }

    /**
     * add resolve into map and group with existed resolve
     */
  }, {
    key: "addResolver",
    value: function addResolver(id) {
      var _this6 = this;
      var originalResolve = this._resolveFnMap.get(id);
      var closed = new Promise(function (resolve) {
        _this6._resolveFnMap.set(id, function (value) {
          originalResolve === null || originalResolve === void 0 ? void 0 : originalResolve(value);
          resolve(value);
        });
      });
      return closed;
    }
  }]);
}(_lib.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_idTypeMap", [_reactantShare.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_idTypeCacheMap", [_lib.globalStorage, _reactantShare.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIdTypeCacheMap", [_reactantShare.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setIdTypeCacheMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIdTypeMap", [_reactantShare.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setIdTypeMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeIdTypeMaps", [_reactantShare.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeIdTypeMaps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeIdTypeCacheMaps", [_reactantShare.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeIdTypeCacheMaps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeIdTypeCacheMaps", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "removeIdTypeCacheMaps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearIdTypeMaps", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "clearIdTypeMaps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearIdTypeMaps", [_reactantShare.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearIdTypeMaps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resolveFn", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "resolveFn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startTimer", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "startTimer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearTimer", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "clearTimer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callOnEvent", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "callOnEvent"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PortalHost.js.map
