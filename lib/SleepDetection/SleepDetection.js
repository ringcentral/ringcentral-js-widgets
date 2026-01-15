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
exports.SleepDetection = exports.EVENTS = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/web.timers.js");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _events = require("events");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_INTERVAL = 20 * 1000;
// For chrome 88 timer-throttling https://developer.chrome.com/blog/timer-throttling-in-chrome-88/
// need to make sure time diff is more than 1 min
var DEFAULT_THRESHOLD = 75 * 1000;
var DEFAULT_MAX_LISTENERS = 30;
var EVENTS = exports.EVENTS = _ObjectMap.ObjectMap.fromKeys(['heartbeat', 'detected']);
var SleepDetection = exports.SleepDetection = /*#__PURE__*/function () {
  function SleepDetection() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$detectionInterva = _ref.detectionInterval,
      detectionInterval = _ref$detectionInterva === void 0 ? DEFAULT_INTERVAL : _ref$detectionInterva,
      _ref$detectionThresho = _ref.detectionThreshold,
      detectionThreshold = _ref$detectionThresho === void 0 ? DEFAULT_THRESHOLD : _ref$detectionThresho,
      _ref$maxListeners = _ref.maxListeners,
      maxListeners = _ref$maxListeners === void 0 ? DEFAULT_MAX_LISTENERS : _ref$maxListeners,
      _ref$startImmediately = _ref.startImmediately,
      startImmediately = _ref$startImmediately === void 0 ? true : _ref$startImmediately;
    _classCallCheck(this, SleepDetection);
    this._detectionInterval = void 0;
    this._detectionThreshold = void 0;
    this._timeoutId = null;
    this._emitter = new _events.EventEmitter();
    this._detectionInterval = detectionInterval;
    this._detectionThreshold = detectionThreshold;
    this._emitter.setMaxListeners(maxListeners);
    if (startImmediately) {
      this.start();
    }
  }
  return _createClass(SleepDetection, [{
    key: "events",
    get: function get() {
      return EVENTS;
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      this._emitter.on(event, handler);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      this._emitter.off(event, handler);
    }
  }, {
    key: "_detect",
    value: function _detect() {
      var _this = this;
      this.stop();
      var startTime = Date.now();
      this._emitter.emit(this.events.heartbeat, startTime);
      this._timeoutId = global.setTimeout(function () {
        var endTime = Date.now();
        var sleepTime = endTime - startTime - _this._detectionInterval;
        if (sleepTime > _this._detectionThreshold) {
          console.log('==== Sleep Detected =====');
          _this._emitter.emit(_this.events.detected, startTime, endTime, sleepTime);
        }
        _this._timeoutId = null;
        _this._detect();
      }, this._detectionInterval);
    }
  }, {
    key: "start",
    value: function start() {
      this._detect();
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._timeoutId) {
        global.clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
    }
  }]);
}();
//# sourceMappingURL=SleepDetection.js.map
