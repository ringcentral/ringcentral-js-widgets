"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
require("regenerator-runtime/runtime");
var _SingleTabBroadcastChannel = require("@ringcentral-integration/commons/lib/SingleTabBroadcastChannel");
var _events = require("events");
var _enums = require("../enums");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var knowledgeBaseArticles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this._channel.request({
                  key: _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
                  value: value
                });
              case 2:
                knowledgeBaseArticles = _context.sent;
                _this.sendToAngular(_this.eventKeys.getKnowledgeBaseArticles, knowledgeBaseArticles);
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  // that init method call from angular.
  _createClass(AgentScriptApp, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new _SingleTabBroadcastChannel.SingleTabBroadcastChannel(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, {
                  from: _enums.EV_AGENT_SCRIPT_PAGE_KEY,
                  to: _enums.EV_APP_PAGE_KEY
                }).onTabIdExist();
              case 2:
                this._channel = _context2.sent;
                _context2.next = 5;
                return this._channel.request({
                  key: _enums.agentScriptEvents.INIT
                });
              case 5:
                _context2.t0 = _context2.sent;
                if (_context2.t0) {
                  _context2.next = 8;
                  break;
                }
                _context2.t0 = {
                  config: null,
                  call: null
                };
              case 8:
                value = _context2.t0;
                this.sendToAngular(this.eventKeys.updateScript, value);
                this._bindBroadCastEvent();
              case 11:
              case "end":
                return _context2.stop();
            }
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
  return AgentScriptApp;
}(); // Here just assertion as any, that only for using in angular.
window.app = new AgentScriptApp();
//# sourceMappingURL=agentScript.js.map
