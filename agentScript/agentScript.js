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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _SingleTabBroadcastChannel = require("@ringcentral-integration/commons/lib/SingleTabBroadcastChannel");
var _events = require("events");
var _enums = require("../enums");
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
var AgentScriptApp = /*#__PURE__*/function () {
  function AgentScriptApp() {
    var _this = this;
    _classCallCheck(this, AgentScriptApp);
    this._channel = void 0;
    this.eventEmitter = new _events.EventEmitter();
    this.toAngularKey = 'to_angular';
    this.fromAngularKey = 'from_angular';
    this.eventKeys = {
      updateScript: _enums.agentScriptEvents.INIT,
      setScriptResult: _enums.agentScriptEvents.SET_SCRIPT_RESULT,
      updateDisposition: _enums.agentScriptEvents.UPDATE_DISPOSITION,
      getKnowledgeBaseArticles: _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES
    };
    this.bindAngularEventAndSend([this.eventKeys.setScriptResult, this.eventKeys.updateDisposition]);
    this.bindAngularEvent(this.eventKeys.getKnowledgeBaseArticles, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        var knowledgeBaseArticles;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return _this._channel.request({
                key: _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
                value: value
              });
            case 1:
              knowledgeBaseArticles = _context.v;
              _this.sendToAngular(_this.eventKeys.getKnowledgeBaseArticles, knowledgeBaseArticles);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  // that init method call from angular.
  return _createClass(AgentScriptApp, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var value, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return new _SingleTabBroadcastChannel.SingleTabBroadcastChannel(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, {
                from: _enums.EV_AGENT_SCRIPT_PAGE_KEY,
                to: _enums.EV_APP_PAGE_KEY
              }).onTabIdExist();
            case 1:
              this._channel = _context2.v;
              _context2.n = 2;
              return this._channel.request({
                key: _enums.agentScriptEvents.INIT
              });
            case 2:
              _t = _context2.v;
              if (_t) {
                _context2.n = 3;
                break;
              }
              _t = {
                config: null,
                call: null
              };
            case 3:
              value = _t;
              this.sendToAngular(this.eventKeys.updateScript, value);
              this._bindBroadCastEvent();
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "_bindBroadCastEvent",
    value: function _bindBroadCastEvent() {
      var _this2 = this;
      this._channel.addEventListener(function (_ref2) {
        var data = _ref2.data;
        var key = data.key,
          value = data.value;
        switch (key) {
          case _enums.agentScriptEvents.INIT:
            _this2.sendToAngular(_this2.eventKeys.updateScript, value);
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: "bindAngularEventAndSend",
    value: function bindAngularEventAndSend(keys) {
      var _this3 = this;
      keys.forEach(function (key) {
        _this3.eventEmitter.on(_this3.fromAngularKey + key, function (value) {
          return _this3._channel.send({
            key: key,
            value: value
          });
        });
      });
      return this;
    }
  }, {
    key: "bindAngularEvent",
    value: function bindAngularEvent(key, cb) {
      this.eventEmitter.on(this.fromAngularKey + key, cb);
      return this;
    }
  }, {
    key: "sendToAngular",
    value: function sendToAngular(key, value) {
      this.eventEmitter.emit(this.toAngularKey + key, value);
    }
  }]);
}(); // Here just assertion as any, that only for using in angular.
window.app = new AgentScriptApp();
//# sourceMappingURL=agentScript.js.map
