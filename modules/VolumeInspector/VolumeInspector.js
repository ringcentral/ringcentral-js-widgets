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
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
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
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.volume, that.countDown, that.testState, that.type];
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
    _this.setVolumeCb = function (volume) {
      _this.setVolume(volume);
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
      var _setType2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setType(type);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setType(_x) {
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
      var _setVolume2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(volume) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._setVolume(volume);
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setVolume(_x2) {
        return _setVolume2.apply(this, arguments);
      }
      return setVolume;
    }()
  }, {
    key: "setTestState",
    value: function () {
      var _setTestState2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(testState) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._setTestState(testState);
                this._setVolume(0);
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function setTestState(_x3) {
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
      var _setCountDown2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(recordingTime) {
        var countDown;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                countDown = Math.ceil((_const.MAX_RECORDING_TIME - recordingTime) / 1000);
                this._setCountDown(countDown);
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function setCountDown(_x4) {
        return _setCountDown2.apply(this, arguments);
      }
      return setCountDown;
    }()
  }, {
    key: "_preloadAudio",
    value: function () {
      var _preloadAudio2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return (0, _utils.getBlobURL)(_break["default"]);
              case 3:
                this._sampleAudioBlobUrl = _context5.sent;
                _context5.next = 9;
                break;
              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                console.error('failed to preload audio', _context5.t0);
              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));
      function _preloadAudio() {
        return _preloadAudio2.apply(this, arguments);
      }
      return _preloadAudio;
    }()
  }, {
    key: "setupAudioDetector",
    value: function () {
      var _setupAudioDetector = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.audioEl) {
                  _context6.next = 3;
                  break;
                }
                console.warn('Can not setup AudioDetector - no audio element.');
                return _context6.abrupt("return");
              case 3:
                _context6.next = 5;
                return this.audioDetector.connect(this.audioEl);
              case 5:
                result = this.audioDetector.registerListener(this.setVolumeCb);
                if (!(result instanceof Error)) {
                  _context6.next = 9;
                  break;
                }
                console.warn('register detector listener error.');
                return _context6.abrupt("return");
              case 9:
                this.detectorListenDisposer = result.setInterval(_const.LEVEL_CHECK_INTERVAL).start();
              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function setupAudioDetector() {
        return _setupAudioDetector.apply(this, arguments);
      }
      return setupAudioDetector;
    }()
  }, {
    key: "handleTestMicroClick",
    value: function () {
      var _handleTestMicroClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(testState) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = testState;
                _context7.next = _context7.t0 === _const.TEST_STATE.IDLE ? 3 : _context7.t0 === _const.TEST_STATE.RECORDS_AUDIO ? 5 : _context7.t0 === _const.TEST_STATE.PLAYS_AUDIO ? 7 : 9;
                break;
              case 3:
                this.startRecording();
                return _context7.abrupt("break", 9);
              case 5:
                this.stopRecording();
                return _context7.abrupt("break", 9);
              case 7:
                this.completeTest();
                return _context7.abrupt("break", 9);
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function handleTestMicroClick(_x5) {
        return _handleTestMicroClick.apply(this, arguments);
      }
      return handleTestMicroClick;
    }()
  }, {
    key: "handleTestSpeakerClick",
    value: function () {
      var _handleTestSpeakerClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(testState) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = testState;
                _context8.next = _context8.t0 === _const.TEST_STATE.IDLE ? 3 : _context8.t0 === _const.TEST_STATE.PLAYS_AUDIO ? 5 : 7;
                break;
              case 3:
                this.startPlaySampleAudio();
                return _context8.abrupt("break", 7);
              case 5:
                this.completeTest();
                return _context8.abrupt("break", 7);
              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function handleTestSpeakerClick(_x6) {
        return _handleTestSpeakerClick.apply(this, arguments);
      }
      return handleTestSpeakerClick;
    }()
  }, {
    key: "startPlaySampleAudio",
    value: function () {
      var _startPlaySampleAudio = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.setType(_const.TEST_TYPE.speaker);
                this.startPlayback(this._sampleAudioBlobUrl, this._deps.audioSettings.callVolume);
              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function startPlaySampleAudio() {
        return _startPlaySampleAudio.apply(this, arguments);
      }
      return startPlaySampleAudio;
    }()
  }, {
    key: "startPlayback",
    value: function () {
      var _startPlayback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(src, volume) {
        var _this$audioEl$capture, _this$audioEl;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.setTestState(_const.TEST_STATE.PLAYS_AUDIO);
                _context10.prev = 1;
                this.audioEl.src = src;
                this.audioEl.currentTime = 0;
                _context10.next = 6;
                return this.setupAudioDetector();
              case 6:
                _context10.next = 8;
                return this.audioEl.play();
              case 8:
                // this trick is due to connected audio analyzer (MicDetector) that makes
                // impossible to output audio to specific (selected) device other than default
                // @ts-expect-error
                this.outputEl.srcObject = (_this$audioEl$capture = (_this$audioEl = this.audioEl).captureStream) === null || _this$audioEl$capture === void 0 ? void 0 : _this$audioEl$capture.call(_this$audioEl);
                if (this.outputEl.setSinkId && this._deps.audioSettings.outputDeviceId) {
                  this.outputEl.setSinkId(this._deps.audioSettings.outputDeviceId);
                }
                if (volume !== undefined) {
                  this.outputEl.volume = volume;
                }
                this.outputEl.play();
                _context10.next = 18;
                break;
              case 14:
                _context10.prev = 14;
                _context10.t0 = _context10["catch"](1);
                console.warn('Recording play failed', _context10.t0);
                this.completeTest();
              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[1, 14]]);
      }));
      function startPlayback(_x7, _x8) {
        return _startPlayback.apply(this, arguments);
      }
      return startPlayback;
    }()
  }, {
    key: "stopPlayback",
    value: function () {
      var _stopPlayback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this$detectorListenD;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.audioEl) {
                  this.audioEl.pause();
                }
                if (this.outputEl) {
                  this.outputEl.pause();
                  if (this.outputEl.srcObject) {
                    (0, _stream.stopStream)(this.outputEl.srcObject);
                    this.outputEl.srcObject = null;
                  }
                }
                (_this$detectorListenD = this.detectorListenDisposer) === null || _this$detectorListenD === void 0 ? void 0 : _this$detectorListenD.call(this);
                this.detectorListenDisposer = null;
              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function stopPlayback() {
        return _stopPlayback.apply(this, arguments);
      }
      return stopPlayback;
    }()
  }, {
    key: "onRecordingComplete",
    value: function () {
      var _onRecordingComplete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(src) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this.micLevel.clear();
                this.startPlayback(src);
              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function onRecordingComplete(_x9) {
        return _onRecordingComplete.apply(this, arguments);
      }
      return onRecordingComplete;
    }()
  }, {
    key: "startRecording",
    value: function () {
      var _startRecording = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var stream;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.setType(_const.TEST_TYPE.microphone);
                this.setTestState(_const.TEST_STATE.RECORDS_AUDIO);
                _context13.prev = 2;
                _context13.next = 5;
                return this.micLevel.setupMicMedia(this._deps.audioSettings.inputDeviceId);
              case 5:
                stream = _context13.sent;
                _context13.next = 13;
                break;
              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](2);
                console.warn('can not setup mic media', _context13.t0);
                this.setTestState(_const.TEST_STATE.IDLE);
                return _context13.abrupt("return");
              case 13:
                _context13.prev = 13;
                _context13.next = 16;
                return this.micLevel.listenToMic(this.setVolumeCb);
              case 16:
                this.mediaRecorderHelper.startRecording(stream);
                _context13.next = 24;
                break;
              case 19:
                _context13.prev = 19;
                _context13.t1 = _context13["catch"](13);
                console.warn('can not start startRecording', _context13.t1);
                this.micLevel.clear();
                this.completeTest();
              case 24:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[2, 8], [13, 19]]);
      }));
      function startRecording() {
        return _startRecording.apply(this, arguments);
      }
      return startRecording;
    }()
  }, {
    key: "stopRecording",
    value: function () {
      var _stopRecording = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                try {
                  this.mediaRecorderHelper.stopRecording();
                } catch (e) {
                  console.warn('stopRecording failed', e);
                  this.completeTest();
                }
                this.micLevel.clear();
              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function stopRecording() {
        return _stopRecording.apply(this, arguments);
      }
      return stopRecording;
    }()
  }, {
    key: "completeTest",
    value: function () {
      var _completeTest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.doCompleteTest();
              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function completeTest() {
        return _completeTest.apply(this, arguments);
      }
      return completeTest;
    }()
  }, {
    key: "onEnded",
    value: function onEnded() {
      this.doCompleteTest();
    }
  }, {
    key: "doCompleteTest",
    value: function () {
      var _doCompleteTest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.setType(null);
                this.setTestState(_const.TEST_STATE.IDLE);
                this.stopPlayback();
              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function doCompleteTest() {
        return _doCompleteTest.apply(this, arguments);
      }
      return doCompleteTest;
    }()
  }, {
    key: "data",
    get: function get() {
      return {
        volume: this.volume,
        countDown: this.countDown,
        testState: this.testState,
        isRecording: this.testState === _const.TEST_STATE.RECORDS_AUDIO,
        type: this.type
      };
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
}), _applyDecoratedDescriptor(_class2.prototype, "_setType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setType", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTestState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setVolume", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVolume", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTestState", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setCountDown", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCountDown"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCountDown", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setCountDown"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setupAudioDetector", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setupAudioDetector"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTestMicroClick", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTestMicroClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTestSpeakerClick", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTestSpeakerClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPlaySampleAudio", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startPlaySampleAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPlayback", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startPlayback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopPlayback", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopPlayback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRecordingComplete", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onRecordingComplete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecording", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecording"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecording", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecording"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeTest", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "completeTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "doCompleteTest", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "doCompleteTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "data", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "data"), _class2.prototype)), _class2)) || _class);
exports.VolumeInspector = VolumeInspector;
//# sourceMappingURL=VolumeInspector.js.map
