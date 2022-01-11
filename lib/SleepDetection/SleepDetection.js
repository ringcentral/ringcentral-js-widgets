"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SleepDetection = exports.EVENTS = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.date.now");

var _events = require("events");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DEFAULT_INTERVAL = 20 * 1000; // For chrome 88 timer-throttling https://developer.chrome.com/blog/timer-throttling-in-chrome-88/
// need to make sure time diff is more than 1 min

var DEFAULT_THRESHOLD = 75 * 1000;
var DEFAULT_MAX_LISTENERS = 30;

var EVENTS = _ObjectMap.ObjectMap.fromKeys(['heartbeat', 'detected']);

exports.EVENTS = EVENTS;

var SleepDetection = /*#__PURE__*/function () {
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

  _createClass(SleepDetection, [{
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
  }, {
    key: "events",
    get: function get() {
      return EVENTS;
    }
  }]);

  return SleepDetection;
}();

exports.SleepDetection = SleepDetection;
//# sourceMappingURL=SleepDetection.js.map
