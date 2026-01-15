"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabLife = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _utils = require("@ringcentral-integration/commons/utils");
var _events = require("events");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TAB_CHANNEL_KEY = 'channel$$';
var ALIVE_EVENT = 'TabLife_alive';

// TODO: that tabLife need cleanup
var TabLife = exports.TabLife = /*#__PURE__*/function () {
  function TabLife(prefix) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      intervalTime: 1000,
      checkTime: 30 * 1000
    };
    _classCallCheck(this, TabLife);
    this.prefix = prefix;
    this.option = option;
    this._eventEmitter = new _events.EventEmitter();
    this.reqKey = "".concat(this.prefix, "_req_").concat(TAB_CHANNEL_KEY);
    this.resKey = "".concat(this.prefix, "_res_").concat(TAB_CHANNEL_KEY);
    this._req = void 0;
    this._res = void 0;
    this._isInit = false;
    this._isAlive = false;
    this._destroy = false;
  }
  return _createClass(TabLife, [{
    key: "isAlive",
    value: function () {
      var _isAlive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(timeout) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._isAlive) {
                _context.n = 1;
                break;
              }
              return _context.a(2, true);
            case 1:
              return _context.a(2, this._checkHasAlive(timeout));
          }
        }, _callee, this);
      }));
      function isAlive(_x) {
        return _isAlive.apply(this, arguments);
      }
      return isAlive;
    }()
  }, {
    key: "isLeave",
    value: function () {
      var _isLeave = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var timeout,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              timeout = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 3000;
              _context2.n = 1;
              return this.isAlive(timeout);
            case 1:
              return _context2.a(2, !_context2.v);
          }
        }, _callee2, this);
      }));
      function isLeave() {
        return _isLeave.apply(this, arguments);
      }
      return isLeave;
    }()
  }, {
    key: "init",
    value: function init() {
      console.log("".concat(this.reqKey, "--------------init"));
      if (!this._isInit) {
        this._req = new BroadcastChannel(this.reqKey);
        this._res = new BroadcastChannel(this.resKey);
      }
      this._isInit = true;
      this._isAlive = false;
      this._destroy = false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log("".concat(this.reqKey, "--------------destroy"));
      if (this._isInit) {
        this._req.close();
        this._res.close();
      }
      this._isInit = false;
      this._isAlive = false;
      this._destroy = true;
    }
  }, {
    key: "alive",
    value: function alive() {
      var _this = this;
      if (!this._isAlive) {
        console.log("".concat(this.reqKey, "--------------bindAlive"));
        this._req.onmessage = function (_ref) {
          var data = _ref.data;
          var key = data.key;
          console.log('alive!!!', key);
          switch (key) {
            case _this.prefix:
              if (!_this._destroy) {
                _this._res.postMessage({
                  key: _this.prefix
                });
              }
              break;
            default:
              break;
          }
        };
        this._isAlive = true;
        // for self tab get alive event
      }
      this._eventEmitter.emit(ALIVE_EVENT, true);
    }
  }, {
    key: "onLeave",
    value: function () {
      var _onLeave = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(cb) {
        var checkTime,
          count,
          alive,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              checkTime = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : this.option.intervalTime;
              count = 0;
            case 1:
              if (!(count < 10)) {
                _context3.n = 7;
                break;
              }
              if (!(this._isAlive || this._destroy)) {
                _context3.n = 2;
                break;
              }
              console.log('check leave end');
              return _context3.a(3, 7);
            case 2:
              _context3.n = 3;
              return this._checkHasAlive(checkTime);
            case 3:
              alive = _context3.v;
              console.log('alive?~', alive);
              if (alive) {
                _context3.n = 5;
                break;
              }
              if (!(count > 0)) {
                _context3.n = 4;
                break;
              }
              cb();
              return _context3.a(3, 7);
            case 4:
              count++;
              _context3.n = 6;
              break;
            case 5:
              _context3.n = 6;
              return (0, _utils.sleep)(checkTime);
            case 6:
              _context3.n = 1;
              break;
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onLeave(_x2) {
        return _onLeave.apply(this, arguments);
      }
      return onLeave;
    }()
  }, {
    key: "_checkHasAlive",
    value: function () {
      var _checkHasAlive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this2 = this;
        var timeout,
          _resolve,
          resolveTrue,
          listener,
          result,
          _args4 = arguments,
          _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              timeout = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : this.option.checkTime;
              resolveTrue = function resolveTrue() {
                return _resolve(true);
              };
              listener = function listener(_ref2) {
                var data = _ref2.data;
                var key = data.key;
                switch (key) {
                  case _this2.prefix:
                    _this2._eventEmitter.emit(ALIVE_EVENT, true);
                    break;
                  default:
                    break;
                }
              };
              _context4.p = 1;
              _context4.n = 2;
              return (0, _utils.waitUntilTo)(function () {
                return new Promise(function (resolve) {
                  _resolve = resolve;
                  _this2._eventEmitter.once(ALIVE_EVENT, resolveTrue);
                  if (_this2._isInit) {
                    try {
                      _this2._res.addEventListener('message', listener);
                      _this2._req.postMessage({
                        key: _this2.prefix
                      });
                    } catch (error) {
                      _resolve(false);
                    }
                  }
                });
              }, {
                timeout: timeout
              });
            case 2:
              result = _context4.v;
              return _context4.a(2, result);
            case 3:
              _context4.p = 3;
              _t = _context4.v;
              return _context4.a(2, false);
            case 4:
              _context4.p = 4;
              this._eventEmitter.off(ALIVE_EVENT, resolveTrue);
              if (this._isInit) {
                try {
                  this._res.removeEventListener('message', listener);
                } catch (error) {
                  // console.trace(error);
                }
              }
              _resolve();
              return _context4.f(4);
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3, 4, 5]]);
      }));
      function _checkHasAlive() {
        return _checkHasAlive2.apply(this, arguments);
      }
      return _checkHasAlive;
    }()
  }]);
}();
//# sourceMappingURL=tabLife.js.map
