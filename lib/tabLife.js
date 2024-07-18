"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabLife = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/commons/utils");
var _events = require("events");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var TabLife = /*#__PURE__*/function () {
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
  _createClass(TabLife, [{
    key: "isAlive",
    value: function () {
      var _isAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(timeout) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._isAlive) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", true);
              case 2:
                return _context.abrupt("return", this._checkHasAlive(timeout));
              case 3:
              case "end":
                return _context.stop();
            }
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
      var _isLeave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var timeout,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                timeout = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 3000;
                _context2.next = 3;
                return this.isAlive(timeout);
              case 3:
                return _context2.abrupt("return", !_context2.sent);
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _onLeave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cb) {
        var checkTime,
          count,
          alive,
          _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                checkTime = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : this.option.intervalTime;
                count = 0;
              case 2:
                if (!(count < 10)) {
                  _context3.next = 21;
                  break;
                }
                if (!(this._isAlive || this._destroy)) {
                  _context3.next = 6;
                  break;
                }
                console.log('check leave end');
                return _context3.abrupt("break", 21);
              case 6:
                _context3.next = 8;
                return this._checkHasAlive(checkTime);
              case 8:
                alive = _context3.sent;
                console.log('alive?~', alive);
                if (alive) {
                  _context3.next = 17;
                  break;
                }
                if (!(count > 0)) {
                  _context3.next = 14;
                  break;
                }
                cb();
                return _context3.abrupt("break", 21);
              case 14:
                count++;
                _context3.next = 19;
                break;
              case 17:
                _context3.next = 19;
                return (0, _utils.sleep)(checkTime);
              case 19:
                _context3.next = 2;
                break;
              case 21:
              case "end":
                return _context3.stop();
            }
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
      var _checkHasAlive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;
        var timeout,
          _resolve,
          resolveTrue,
          listener,
          result,
          _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
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
                _context4.prev = 3;
                _context4.next = 6;
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
              case 6:
                result = _context4.sent;
                return _context4.abrupt("return", result);
              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](3);
                return _context4.abrupt("return", false);
              case 13:
                _context4.prev = 13;
                this._eventEmitter.off(ALIVE_EVENT, resolveTrue);
                if (this._isInit) {
                  try {
                    this._res.removeEventListener('message', listener);
                  } catch (error) {
                    // console.trace(error);
                  }
                }
                _resolve();
                return _context4.finish(13);
              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 10, 13, 18]]);
      }));
      function _checkHasAlive() {
        return _checkHasAlive2.apply(this, arguments);
      }
      return _checkHasAlive;
    }()
  }]);
  return TabLife;
}();
exports.TabLife = TabLife;
//# sourceMappingURL=tabLife.js.map
