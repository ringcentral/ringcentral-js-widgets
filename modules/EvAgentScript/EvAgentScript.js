"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentScript = void 0;
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/web.timers.js");
var _SingleTabBroadcastChannel = require("@ringcentral-integration/commons/lib/SingleTabBroadcastChannel");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _ramda = require("ramda");
var _enums = require("../../enums");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var EvAgentScript = exports.EvAgentScript = (_dec = (0, _di.Module)({
  name: 'EvAgentScript',
  deps: ['EvClient', 'EvAuth', 'EvCall', 'Storage', 'TabManager', 'EvCallMonitor', {
    dep: 'EvAgentScriptOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  function EvAgentScript(deps) {
    var _this;
    _classCallCheck(this, EvAgentScript);
    _this = _callSuper(this, EvAgentScript, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentScript'
    }]);
    _this._channel = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._hadResponse = false;
    // currentChatScripts: any = null;
    _initializerDefineProperty(_this, "currentCallScript", _descriptor, _this);
    _initializerDefineProperty(_this, "isDisplayAgentScript", _descriptor2, _this);
    _initializerDefineProperty(_this, "callScriptResultMapping", _descriptor3, _this);
    _this.debouncedSetCallScriptResult = (0, _debounceThrottle.debounce)({
      fn: _this.setCallScriptResult
    });
    return _this;
  }
  _inherits(EvAgentScript, _ref);
  return _createClass(EvAgentScript, [{
    key: "setIsDisplayAgentScript",
    value: function setIsDisplayAgentScript(state) {
      this.isDisplayAgentScript = state;
    }
  }, {
    key: "setCurrentCallScript",
    value: function setCurrentCallScript(script) {
      this.currentCallScript = script;
    }
  }, {
    key: "setCallScriptResult",
    value: function setCallScriptResult(id, data) {
      this.callScriptResultMapping[id] = data;
      this._eventEmitter.emit(_enums.agentScriptEvents.SET_SCRIPT_RESULT, id, data);
    }
  }, {
    key: "reset",
    value: function reset() {
      console.log('!!!EvAgentScript reset');
      // this.setIsDisplayAgentScript(false);
    }
  }, {
    key: "onSetScriptResult",
    value: function onSetScriptResult(cb) {
      this._eventEmitter.on(_enums.agentScriptEvents.SET_SCRIPT_RESULT, cb);
    }
  }, {
    key: "onUpdateDisposition",
    value: function onUpdateDisposition(cb) {
      this._eventEmitter.on(_enums.agentScriptEvents.UPDATE_DISPOSITION, cb);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._bindChannel();

      // when script change emit that
      (0, _core.watch)(this, function () {
        return _this2.currentCallScript;
      }, function () {
        _this2._responseInitScript();
      });
      this._deps.evCallMonitor.onCallAnswered(/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(call) {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!_this2.getIsAgentScript(call)) {
                  _context.n = 1;
                  break;
                }
                _context.n = 1;
                return _this2.getScript(call.scriptId, call.scriptVersion, 'CALL', call.uii);
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      this._deps.evAuth.beforeAgentLogout(function () {
        _this2.reset();
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      console.log('EvAgentScript!! init');
      this.setIsDisplayAgentScript(true);
    }
  }, {
    key: "getIsAgentScript",
    value: function getIsAgentScript(call) {
      return !!(this.isDisplayAgentScript && (call === null || call === void 0 ? void 0 : call.scriptId));
    }
  }, {
    key: "_bindChannel",
    value: function _bindChannel() {
      var _this3 = this;
      if (this._deps.tabManager.enable && !sessionStorage.getItem(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY)) {
        sessionStorage.setItem(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, this._deps.tabManager.id);
      }
      this._channel = new _SingleTabBroadcastChannel.SingleTabBroadcastChannel(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, {
        from: _enums.EV_APP_PAGE_KEY,
        to: _enums.EV_AGENT_SCRIPT_PAGE_KEY
      }).init();
      this._channel.addEventListener(function (_ref3) {
        var data = _ref3.data;
        var key = data.key,
          value = data.value;
        var _this3$_deps$evCall = _this3._deps.evCall,
          activityCallId = _this3$_deps$evCall.activityCallId,
          currentCall = _this3$_deps$evCall.currentCall;
        if (_this3.isDisplayAgentScript && activityCallId && (currentCall === null || currentCall === void 0 ? void 0 : currentCall.scriptId)) {
          switch (key) {
            case _enums.agentScriptEvents.INIT:
              _this3._responseInitScript();
              break;
            case _enums.agentScriptEvents.SET_SCRIPT_RESULT:
              _this3.debouncedSetCallScriptResult(activityCallId, value);
              break;
            case _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES:
              _this3._getKnowledgeBaseGroups(value);
              break;
            case _enums.agentScriptEvents.UPDATE_DISPOSITION:
              _this3._eventEmitter.emit(_enums.agentScriptEvents.UPDATE_DISPOSITION, activityCallId, value);
              break;
            default:
              break;
          }
        }
      });

      // if that agent Script is more quick than CTI app, that will need emit that when app init.
      setTimeout(function () {
        if (_this3.currentCallScript && !_this3._hadResponse) {
          _this3._responseInitScript();
        }
      }, 1000);
    }
  }, {
    key: "_getKnowledgeBaseGroups",
    value: function () {
      var _getKnowledgeBaseGroups2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(knowledgeBaseGroupIds) {
        var value;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._deps.evClient.getKnowledgeBaseGroups(knowledgeBaseGroupIds);
            case 1:
              value = _context2.v;
              this._channel.send({
                key: _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
                value: value
              });
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _getKnowledgeBaseGroups(_x2) {
        return _getKnowledgeBaseGroups2.apply(this, arguments);
      }
      return _getKnowledgeBaseGroups;
    }()
  }, {
    key: "_responseInitScript",
    value: function _responseInitScript() {
      this._channel.send({
        key: _enums.agentScriptEvents.INIT,
        value: {
          config: this.currentCallScript,
          call: this._deps.evCall.currentCall
        }
      });
      this._hadResponse = true;
    }
  }, {
    key: "getScript",
    value: function () {
      var _getScript = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(scriptId) {
        var version,
          type,
          uii,
          response,
          result,
          _args3 = arguments,
          _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              version = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              type = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'CALL';
              uii = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;
              _context3.n = 1;
              return this._deps.evClient.getScript(scriptId, version);
            case 1:
              response = _context3.v;
              // TODO: that will fix in next MR
              result = {
                scriptId: response.scriptId,
                // scriptName: response.scriptName,
                // finalResult: null as any, // used for reporting
                // navPosition: null as any,
                // version: response.version,
                data: JSON.parse(response.json)
              };
              _t = type;
              _context3.n = _t === 'CALL' ? 2 : 3;
              break;
            case 2:
              this.setCurrentCallScript(result);
              return _context3.a(3, 4);
            case 3:
              return _context3.a(3, 4);
            case 4:
              return _context3.a(2, result);
          }
        }, _callee3, this);
      }));
      function getScript(_x3) {
        return _getScript.apply(this, arguments);
      }
      return getScript;
    }()
    /**
     * @param call - the corresponding chat or call object
     */
  }, {
    key: "saveScriptResult",
    value: function saveScriptResult(call) {
      var scriptResult = this.callScriptResultMapping[this._deps.evClient.encodeUii({
        uii: call.uii,
        sessionId: call.session.sessionId
      })];
      if (scriptResult) {
        var result = this._formatScriptResult(scriptResult);
        this._deps.evClient.saveScriptResult(call.uii, call.scriptId, result);
      }
    }
  }, {
    key: "_formatScriptResult",
    value: function _formatScriptResult(scriptResult) {
      var resultCopy = (0, _ramda.clone)(scriptResult);
      resultCopy.model = (0, _ramda.reduce)(function (output, _ref4) {
        var _value$leadField;
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];
        var result = value;
        if (result.value !== undefined) {
          result = result.value;
        }
        output[key] = {
          value: result,
          leadField: (_value$leadField = value.leadField) !== null && _value$leadField !== void 0 ? _value$leadField : ''
        };
        return output;
      }, {}, Object.entries(resultCopy.model));
      return resultCopy;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentCallScript", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isDisplayAgentScript", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "callScriptResultMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsDisplayAgentScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsDisplayAgentScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentCallScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentCallScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallScriptResult", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallScriptResult"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvAgentScript.js.map
