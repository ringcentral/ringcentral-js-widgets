"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array-buffer.slice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.typed-array.uint8-array");
require("core-js/modules/es.typed-array.copy-within");
require("core-js/modules/es.typed-array.every");
require("core-js/modules/es.typed-array.fill");
require("core-js/modules/es.typed-array.filter");
require("core-js/modules/es.typed-array.find");
require("core-js/modules/es.typed-array.find-index");
require("core-js/modules/es.typed-array.for-each");
require("core-js/modules/es.typed-array.includes");
require("core-js/modules/es.typed-array.index-of");
require("core-js/modules/es.typed-array.iterator");
require("core-js/modules/es.typed-array.join");
require("core-js/modules/es.typed-array.last-index-of");
require("core-js/modules/es.typed-array.map");
require("core-js/modules/es.typed-array.reduce");
require("core-js/modules/es.typed-array.reduce-right");
require("core-js/modules/es.typed-array.reverse");
require("core-js/modules/es.typed-array.set");
require("core-js/modules/es.typed-array.slice");
require("core-js/modules/es.typed-array.some");
require("core-js/modules/es.typed-array.sort");
require("core-js/modules/es.typed-array.subarray");
require("core-js/modules/es.typed-array.to-locale-string");
require("core-js/modules/es.typed-array.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTCAudioMeter = void 0;
require("regenerator-runtime/runtime");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-console */
var LOG_TAG = '[RTCAudioMeter]';
var kFftSize = 32;
var kMinDecibels = -90;
var kMaxDecibels = -30;
var kSmoothingTimeConstant = 0.0;
var RTCAudioMeter = /*#__PURE__*/function () {
  _createClass(RTCAudioMeter, null, [{
    key: "_prepareAudioContext",
    value: function _prepareAudioContext() {
      if (!RTCAudioMeter._audioCtx) {
        // @ts-expect-error
        var AudioCtxConstr = window.AudioContext || window.webkitAudioContext;
        RTCAudioMeter._audioCtx = new AudioCtxConstr();
        console.info(LOG_TAG, "prepare audio context success");
      }
    }
  }]);
  function RTCAudioMeter() {
    _classCallCheck(this, RTCAudioMeter);
    this._source = void 0;
    this._analyser = void 0;
    this._data = void 0;
    this._initialize();
  }
  _createClass(RTCAudioMeter, [{
    key: "_initialize",
    value: function _initialize() {
      var _this = this;
      try {
        RTCAudioMeter._prepareAudioContext();
        if (!RTCAudioMeter._audioCtx) {
          console.warn(LOG_TAG, "initialize fail because audio context is null");
          return;
        }
        var isDuplicateAudioMeter = RTCAudioMeter._audioMeters.find(function (item) {
          return item === _this;
        });
        if (!isDuplicateAudioMeter) {
          RTCAudioMeter._audioMeters.push(this);
          console.info(LOG_TAG, "Add user, length: ".concat(RTCAudioMeter._audioMeters.length));
        }
        this._analyser = RTCAudioMeter._audioCtx.createAnalyser();
        this._analyser.fftSize = kFftSize;
        this._analyser.minDecibels = kMinDecibels;
        this._analyser.maxDecibels = kMaxDecibels;
        this._analyser.smoothingTimeConstant = kSmoothingTimeConstant;
        this._data = new Uint8Array(this._analyser.frequencyBinCount);
        console.info(LOG_TAG, "data length is ".concat(this._data.length, " ").concat(this._data.byteLength));
      } catch (e) {
        console.warn(LOG_TAG, "initialize error: ".concat(e.message));
      }
    }
  }, {
    key: "updateInputStream",
    value: function () {
      var _updateInputStream = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        var _RTCAudioMeter$_audio;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.info(LOG_TAG, "update input stream");
                if (!(!RTCAudioMeter._audioCtx || !this._analyser)) {
                  _context.next = 4;
                  break;
                }
                console.info(LOG_TAG, 'There is no audioContext or audioNode');
                return _context.abrupt("return", Promise.reject(new Error('There is no audioContext or audioNode')));
              case 4:
                if (this._source) {
                  console.info(LOG_TAG, 'There is an old audio source, disconnect');
                  this._source.disconnect();
                  delete this._source;
                }
                _context.prev = 5;
                if (!(RTCAudioMeter._audioCtx.state === 'suspended')) {
                  _context.next = 10;
                  break;
                }
                console.info(LOG_TAG, "Try to activate audioContext");
                _context.next = 10;
                return (_RTCAudioMeter$_audio = RTCAudioMeter._audioCtx) === null || _RTCAudioMeter$_audio === void 0 ? void 0 : _RTCAudioMeter$_audio.resume();
              case 10:
                this._source = input instanceof HTMLMediaElement ? RTCAudioMeter._audioCtx.createMediaElementSource(input) : RTCAudioMeter._audioCtx.createMediaStreamSource(input);
                this._source.connect(this._analyser);
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](5);
                console.warn(LOG_TAG, "update media stream error: ".concat(_context.t0.message));
                return _context.abrupt("return", Promise.reject(_context.t0));
              case 18:
                return _context.abrupt("return", Promise.resolve());
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 14]]);
      }));
      function updateInputStream(_x) {
        return _updateInputStream.apply(this, arguments);
      }
      return updateInputStream;
    }()
  }, {
    key: "getMicLevel",
    value: function getMicLevel() {
      try {
        var _RTCAudioMeter$_audio2, _this$_analyser$getBy, _this$_analyser;
        if (!this._source || !this._analyser || !this._data || !RTCAudioMeter._audioCtx || ((_RTCAudioMeter$_audio2 = RTCAudioMeter._audioCtx) === null || _RTCAudioMeter$_audio2 === void 0 ? void 0 : _RTCAudioMeter$_audio2.state) !== 'running') {
          return 0;
        }
        (_this$_analyser$getBy = (_this$_analyser = this._analyser).getByteFrequencyData) === null || _this$_analyser$getBy === void 0 ? void 0 : _this$_analyser$getBy.call(_this$_analyser, this._data);
        var audioEnergy = 0;
        for (var i = 0; i < this._data.length / 2; i++) {
          audioEnergy += this._data[i];
        }
        var audioEnergyFloat = audioEnergy / (255 * this._data.length / 2);
        return audioEnergyFloat;
      } catch (e) {
        console.warn(LOG_TAG, "get mic Level error: ".concat(e.message));
        return 0;
      }
    }
  }]);
  return RTCAudioMeter;
}();
exports.RTCAudioMeter = RTCAudioMeter;
RTCAudioMeter._audioCtx = void 0;
RTCAudioMeter._audioMeters = [];
//# sourceMappingURL=RTCAudioMeter.js.map
