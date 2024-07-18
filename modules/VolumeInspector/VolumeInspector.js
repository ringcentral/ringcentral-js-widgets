"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeInspector = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _AudioDetector = require("./AudioDetector");
var _MediaRecorderHelper = require("./MediaRecorderHelper");
var _MicLevelHelper = require("./MicLevelHelper");
var _break = _interopRequireDefault(require("./audio/break.mp3"));
var _const = require("./const");
var _createAudioElement = require("./utils/createAudioElement");
var _stream = require("./utils/stream");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var VolumeInspector = (_dec = (0, _di.Module)({
  name: 'VolumeInspector',
  deps: ['AudioSettings']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(VolumeInspector, _RcModuleV);
  var _super = _createSuper(VolumeInspector);
  function VolumeInspector(deps) {
    var _this;
    _classCallCheck(this, VolumeInspector);
    _this = _super.call(this, {
      deps: deps
    });
    _this.mediaRecorderHelper = new _MediaRecorderHelper.MediaRecorderHelper();
    _this.micLevel = new _MicLevelHelper.MicLevelHelper();
    _this.audioDetector = new _AudioDetector.AudioDetector();
    _this.detectorListenDisposer = null;
    _this.audioEl = (0, _createAudioElement.createAudioElement)();
    _this.outputEl = (0, _createAudioElement.createAudioElement)();
    _this._sampleAudioBlobUrl = '';
    _initializerDefineProperty(_this, "testState", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "countDown", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "volume", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "type", _descriptor4, _assertThisInitialized(_this));
    _this.startPlayback = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, volume) {
        var _this$audioEl$capture, _this$audioEl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setTestState(_const.TEST_STATE.PLAYS_AUDIO);
                _context.prev = 1;
                _this.audioEl.src = src;
                _this.audioEl.currentTime = 0;
                _context.next = 6;
                return _this.setupAudioDetector();
              case 6:
                _context.next = 8;
                return _this.audioEl.play();
              case 8:
                // this trick is due to connected audio analyzer (MicDetector) that makes
                // impossible to output audio to specific (selected) device other than default
                // @ts-expect-error
                _this.outputEl.srcObject = (_this$audioEl$capture = (_this$audioEl = _this.audioEl).captureStream) === null || _this$audioEl$capture === void 0 ? void 0 : _this$audioEl$capture.call(_this$audioEl);
                if (_this.outputEl.setSinkId && _this._deps.audioSettings.outputDeviceId) {
                  _this.outputEl.setSinkId(_this._deps.audioSettings.outputDeviceId);
                }
                if (volume !== undefined) {
                  _this.outputEl.volume = volume;
                }
                _this.outputEl.play();
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.warn('Recording play failed', _context.t0);
                _this.completeTest();
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.setVolumeCb = function (volume) {
      _this.setVolume(volume);
    };
    _this.stopPlayback = function () {
      var _this$detectorListenD, _this2;
      if (_this.audioEl) {
        _this.audioEl.pause();
      }
      if (_this.outputEl) {
        _this.outputEl.pause();
        if (_this.outputEl.srcObject) {
          (0, _stream.stopStream)(_this.outputEl.srcObject);
          _this.outputEl.srcObject = null;
        }
      }
      (_this$detectorListenD = (_this2 = _this).detectorListenDisposer) === null || _this$detectorListenD === void 0 ? void 0 : _this$detectorListenD.call(_this2);
      _this.detectorListenDisposer = null;
    };
    _this.onRecordingComplete = function (src) {
      _this.micLevel.clear();
      _this.startPlayback(src);
    };
    _this.startRecording = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var stream;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setType(_const.TEST_TYPE.microphone);
              _this.setTestState(_const.TEST_STATE.RECORDS_AUDIO);
              _context2.prev = 2;
              _context2.next = 5;
              return _this.micLevel.setupMicMedia(_this._deps.audioSettings.inputDeviceId);
            case 5:
              stream = _context2.sent;
              _context2.next = 13;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](2);
              console.warn('can not setup mic media', _context2.t0);
              _this.setTestState(_const.TEST_STATE.IDLE);
              return _context2.abrupt("return");
            case 13:
              _context2.prev = 13;
              _context2.next = 16;
              return _this.micLevel.listenToMic(_this.setVolumeCb);
            case 16:
              _this.mediaRecorderHelper.startRecording(stream);
              _context2.next = 22;
              break;
            case 19:
              _context2.prev = 19;
              _context2.t1 = _context2["catch"](13);
              console.warn('can not start startRecording', _context2.t1);
            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 8], [13, 19]]);
    }));
    _this.stopRecording = function () {
      try {
        _this.mediaRecorderHelper.stopRecording();
      } catch (e) {
        console.warn('stopRecording failed', e);
        _this.completeTest();
      }
      _this.micLevel.clear();
    };
    _this.completeTest = function () {
      _this.doCompleteTest();
    };
    _this._preloadAudio();
    _this.mediaRecorderHelper.setRecordingCompleteCallback(_this.onRecordingComplete.bind(_assertThisInitialized(_this)));
    _this.mediaRecorderHelper.setUpdateRecordingTimeCallback(_this.setCountDown.bind(_assertThisInitialized(_this)));
    _this.audioEl.onended = _this.onEnded.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(VolumeInspector, [{
    key: "_setType",
    value: function _setType(type) {
      this.type = type;
    }
  }, {
    key: "setType",
    value: function () {
      var _setType2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._setType(type);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function setType(_x3) {
        return _setType2.apply(this, arguments);
      }
      return setType;
    }()
  }, {
    key: "_setTestState",
    value: function _setTestState(testState) {
      this.testState = testState;
    }
  }, {
    key: "_setVolume",
    value: function _setVolume(volume) {
      this.volume = volume;
    }
  }, {
    key: "setVolume",
    value: function () {
      var _setVolume2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(volume) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._setVolume(volume);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function setVolume(_x4) {
        return _setVolume2.apply(this, arguments);
      }
      return setVolume;
    }()
  }, {
    key: "setTestState",
    value: function () {
      var _setTestState2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(testState) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._setTestState(testState);
                this._setVolume(0);
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function setTestState(_x5) {
        return _setTestState2.apply(this, arguments);
      }
      return setTestState;
    }()
  }, {
    key: "_setCountDown",
    value: function _setCountDown(countDown) {
      this.countDown = countDown;
    }
  }, {
    key: "setCountDown",
    value: function () {
      var _setCountDown2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(recordingTime) {
        var countDown;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                countDown = Math.ceil((_const.MAX_RECORDING_TIME - recordingTime) / 1000);
                this._setCountDown(countDown);
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function setCountDown(_x6) {
        return _setCountDown2.apply(this, arguments);
      }
      return setCountDown;
    }()
  }, {
    key: "_preloadAudio",
    value: function () {
      var _preloadAudio2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return (0, _utils.getBlobURL)(_break["default"]);
              case 3:
                this._sampleAudioBlobUrl = _context7.sent;
                _context7.next = 9;
                break;
              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](0);
                console.error('failed to preload audio', _context7.t0);
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));
      function _preloadAudio() {
        return _preloadAudio2.apply(this, arguments);
      }
      return _preloadAudio;
    }()
  }, {
    key: "setupAudioDetector",
    value: function () {
      var _setupAudioDetector = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.audioEl) {
                  _context8.next = 3;
                  break;
                }
                console.warn('Can not setup AudioDetector - no audio element.');
                return _context8.abrupt("return");
              case 3:
                _context8.next = 5;
                return this.audioDetector.connect(this.audioEl);
              case 5:
                result = this.audioDetector.registerListener(this.setVolumeCb);
                if (!(result instanceof Error)) {
                  _context8.next = 9;
                  break;
                }
                console.warn('register detector listener error.');
                return _context8.abrupt("return");
              case 9:
                this.detectorListenDisposer = result.setInterval(_const.LEVEL_CHECK_INTERVAL).start();
              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function setupAudioDetector() {
        return _setupAudioDetector.apply(this, arguments);
      }
      return setupAudioDetector;
    }() // only for test speaker
  }, {
    key: "startPlaySampleAudio",
    value: function startPlaySampleAudio() {
      this.setType(_const.TEST_TYPE.speaker);
      this.startPlayback(this._sampleAudioBlobUrl, this._deps.audioSettings.callVolume);
    }
  }, {
    key: "onEnded",
    value: function onEnded() {
      this.doCompleteTest();
    }
  }, {
    key: "doCompleteTest",
    value: function doCompleteTest() {
      this.setType(null);
      this.setTestState(_const.TEST_STATE.IDLE);
      this.stopPlayback();
    }
  }]);
  return VolumeInspector;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "testState", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _const.TEST_STATE.IDLE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "countDown", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _const.MAX_RECORDING_SECS;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "volume", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "type", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setType", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTestState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setVolume", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVolume", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTestState", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setCountDown", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCountDown"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCountDown", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setCountDown"), _class2.prototype)), _class2)) || _class);
exports.VolumeInspector = VolumeInspector;
//# sourceMappingURL=VolumeInspector.js.map
