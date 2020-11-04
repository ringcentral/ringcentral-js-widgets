"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleTabBroadcastChannel = void 0;

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _raceTimeout = require("../raceTimeout");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SingleTabBroadcastChannel = /*#__PURE__*/function () {
  _createClass(SingleTabBroadcastChannel, [{
    key: "tabId",
    get: function get() {
      return sessionStorage.getItem(this.key) || '';
    }
  }]);

  function SingleTabBroadcastChannel(key, option) {
    var checkTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;

    _classCallCheck(this, SingleTabBroadcastChannel);

    this.key = key;
    this.option = option;
    this.checkTime = checkTime;
    this._req = void 0;
    this._res = void 0;
  }

  _createClass(SingleTabBroadcastChannel, [{
    key: "onTabIdExist",
    value: function onTabIdExist() {
      var _this = this;

      return new Promise(function (resolve) {
        var intervalId = setInterval(function () {
          if (_this.tabId) {
            clearInterval(intervalId);

            _this.init();

            resolve(_this);
          }
        }, 300);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this._req = new BroadcastChannel(this._createKey(this.option.from));
      this._res = new BroadcastChannel(this._createKey(this.option.to));
      return this;
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
        var _this2 = this;

        var _resolve, listener, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                listener = function listener(_ref) {
                  var data = _ref.data;
                  var key = data.key,
                      value = data.value;

                  switch (key) {
                    case message.key:
                      _resolve(value);

                      break;

                    default:
                      break;
                  }
                };

                _context.next = 3;
                return (0, _raceTimeout.raceTimeout)(new Promise(function (resolve) {
                  _resolve = resolve;

                  _this2._res.addEventListener('message', listener);

                  _this2._makeRequest(message);
                }), {
                  timeout: this.checkTime,
                  onTimeout: function onTimeout(resolve) {
                    return resolve(null);
                  },
                  finalize: function finalize() {
                    _resolve();

                    _this2._res.removeEventListener('message', listener);
                  }
                });

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "send",
    value: function send(message) {
      this._makeRequest(message);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(cb) {
      this._res.onmessage = cb;
      return this;
    }
  }, {
    key: "_makeRequest",
    value: function _makeRequest(message) {
      this._req.postMessage(message);
    }
  }, {
    key: "_createKey",
    value: function _createKey(key) {
      return "".concat(this.key, "_").concat(key, "_channel$$_").concat(this.tabId);
    }
  }]);

  return SingleTabBroadcastChannel;
}();

exports.SingleTabBroadcastChannel = SingleTabBroadcastChannel;
//# sourceMappingURL=SingleTabBroadcastChannel.js.map
