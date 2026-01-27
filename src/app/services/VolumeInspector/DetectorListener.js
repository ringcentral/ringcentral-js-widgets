"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectorListener = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/web.timers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DetectorListener = exports.DetectorListener = /*#__PURE__*/function () {
  function DetectorListener() {
    var _startCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (intervalId) {};
    var _listenHandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var _disposeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (intervalId) {};
    _classCallCheck(this, DetectorListener);
    this._startCallback = _startCallback;
    this._listenHandle = _listenHandle;
    this._disposeCallback = _disposeCallback;
    // unit: ms
    this._interval = 100;
    this._intervalId = void 0;
  }

  /**
   * Listener start to handle detector volume by interval
   * @return ListenDisposer: Function
   */
  return _createClass(DetectorListener, [{
    key: "start",
    value: function start() {
      var _this = this;
      if (!this._intervalId) {
        var intervalId = window.setInterval(function () {
          _this._listenHandle();
        }, this._interval);
        this._startCallback(intervalId);
        this._intervalId = intervalId;
      }
      return function () {
        if (_this._intervalId) {
          clearInterval(_this._intervalId);
          _this._disposeCallback(_this._intervalId);
          delete _this._intervalId;
        }
      };
    }

    /**
     * set interval for listener
     * @param interval: number, default 100 ms
     */
  }, {
    key: "setInterval",
    value: function setInterval(interval) {
      this._interval = interval;
      return this;
    }
  }]);
}();
//# sourceMappingURL=DetectorListener.js.map
