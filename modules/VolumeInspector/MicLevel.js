"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MicLevel = void 0;
require("regenerator-runtime/runtime");
var _AudioDetector = require("./AudioDetector");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * MicLevel is recommended to be a singleton when it is setupMedia for the same deviceId.
 * listenToMic() can be called repeatedly for registering different listener.
 */
var MicLevel = /*#__PURE__*/function () {
  function MicLevel() {
    _classCallCheck(this, MicLevel);
    // unit: ms
    this._interval = 100;
    this._audioDetector = new _AudioDetector.AudioDetector();
    this._preInputDeviceId = void 0;
    this._audioStream = void 0;
    this._detectorListenDisposer = void 0;
  }

  /**
   * setup microphone media by deviceId
   * if deviceId is undefined, then it will try to get user media by default
   * @param deviceId string
   * @return MediaStream or SetupMediaError when getUserMedia failed.
   */
  _createClass(MicLevel, [{
    key: "setupMicMedia",
    value: function () {
      var _setupMicMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(deviceId) {
        var audioConstraint, mediaStream;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!deviceId && deviceId === this._preInputDeviceId)) {
                  _context.next = 3;
                  break;
                }
                console.warn("deviceId is same, not reset for setupMicMedia, deviceId:".concat(deviceId));
                return _context.abrupt("return", this._audioStream);
              case 3:
                audioConstraint = {
                  audio: deviceId ? {
                    deviceId: {
                      exact: deviceId
                    }
                  } : true
                };
                _context.prev = 4;
                _context.next = 7;
                return navigator.mediaDevices.getUserMedia(audioConstraint);
              case 7:
                mediaStream = _context.sent;
                _context.next = 14;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.warn("getUserMedia error, deviceId:".concat(deviceId, ", err:"), _context.t0);
                // to make user handle this error
                return _context.abrupt("return", new Error(_context.t0));
              case 14:
                // make sure new mediaStream is ready then clear current mediaStream
                this.clear();
                this._audioStream = mediaStream;
                this._preInputDeviceId = deviceId || '';
                return _context.abrupt("return", mediaStream);
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));
      function setupMicMedia(_x) {
        return _setupMicMedia.apply(this, arguments);
      }
      return setupMicMedia;
    }()
    /**
     * start to listen microphone mediaStream by interval
     * @param dataCallback
     * @return disposer of listener
     */
  }, {
    key: "listenToMic",
    value: function () {
      var _listenToMic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataCallback) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._audioStream) {
                  _context2.next = 3;
                  break;
                }
                console.warn('No audio stream to listen.');
                throw new Error('No media stream was setup.');
              case 3:
                _context2.next = 5;
                return this._audioDetector.connect(this._audioStream);
              case 5:
                // all listener will also be cleared when audioDetector disconnect.
                result = this._audioDetector.registerListener(dataCallback);
                if (!(result instanceof Error)) {
                  _context2.next = 9;
                  break;
                }
                console.warn('register detector listener error.');
                return _context2.abrupt("return", result);
              case 9:
                this._detectorListenDisposer = result.setInterval(this._interval).start();
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function listenToMic(_x2) {
        return _listenToMic.apply(this, arguments);
      }
      return listenToMic;
    }()
  }, {
    key: "clear",
    value: function clear() {
      var _this$_detectorListen;
      if (this._audioStream) {
        this._audioDetector.disconnect();
        this._audioStream.getTracks().forEach(function (track) {
          track.stop();
        });
        delete this._audioStream;
        delete this._preInputDeviceId;
      }
      (_this$_detectorListen = this._detectorListenDisposer) === null || _this$_detectorListen === void 0 ? void 0 : _this$_detectorListen.call(this);
      this._detectorListenDisposer = null;
    }
    /**
     * set interval for listener
     * @param interval number, default 100 ms
     */
  }, {
    key: "setInterval",
    value: function setInterval(interval) {
      this._interval = interval;
      return this;
    }
  }]);
  return MicLevel;
}();
exports.MicLevel = MicLevel;
//# sourceMappingURL=MicLevel.js.map
