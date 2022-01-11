"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _events = require("events");

var _SingleTabBroadcastChannel = require("@ringcentral-integration/commons/lib/SingleTabBroadcastChannel");

var _enums = require("../enums");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
  } // that init method call from angular.


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
