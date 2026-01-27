"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaRecorderHelper = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _const = require("./const");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MediaRecorderHelper = exports.MediaRecorderHelper = /*#__PURE__*/function () {
  function MediaRecorderHelper() {
    var _this = this;
    _classCallCheck(this, MediaRecorderHelper);
    this.recordingTimer = null;
    this.mediaRecorder = null;
    this.recordedMedia = null;
    this.recordedChunks = [];
    this.recordingTime = 0;
    this.recordingCompleteCallback = null;
    this.updateRecordingTimeCallback = null;
    this.onRecordingComplete = function () {
      var _this$recordingComple;
      var recordingTime = _this.recordingTime;
      _this.cleanupRecording();
      var blob = new Blob(_this.recordedChunks, {
        type: _const.MEDIA_TYPE
      });
      _this.recordedMedia = URL.createObjectURL(blob);
      (_this$recordingComple = _this.recordingCompleteCallback) === null || _this$recordingComple === void 0 ? void 0 : _this$recordingComple.call(_this, _this.recordedMedia, recordingTime);
    };
  }
  return _createClass(MediaRecorderHelper, [{
    key: "countDown",
    get: function get() {
      return Math.ceil((_const.MAX_RECORDING_TIME - this.recordingTime) / 1000);
    }
  }, {
    key: "setRecordingTime",
    value: function setRecordingTime(recordingTime) {
      var _this$updateRecording;
      this.recordingTime = recordingTime;
      (_this$updateRecording = this.updateRecordingTimeCallback) === null || _this$updateRecording === void 0 ? void 0 : _this$updateRecording.call(this, recordingTime);
    }
  }, {
    key: "setUpdateRecordingTimeCallback",
    value: function setUpdateRecordingTimeCallback(callback) {
      this.updateRecordingTimeCallback = callback;
    }
  }, {
    key: "setRecordingCompleteCallback",
    value: function setRecordingCompleteCallback(callback) {
      this.recordingCompleteCallback = callback;
    }
  }, {
    key: "startRecording",
    value: function startRecording(stream) {
      var _this2 = this;
      this.cleanupRecording();
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: _const.MEDIA_TYPE
      });
      this.mediaRecorder.ondataavailable = function (e) {
        _this2.recordedChunks.push(e.data);
      };
      this.mediaRecorder.onstop = this.onRecordingComplete;
      var recordingStarted = Date.now();
      this.mediaRecorder.start();
      this.recordingTimer = setInterval(function () {
        var recordingTime = Date.now() - recordingStarted;
        _this2.setRecordingTime(recordingTime);
        if (recordingTime >= _const.MAX_RECORDING_TIME) {
          _this2.stopRecording();
        }
      }, 1000);
    }
  }, {
    key: "stopRecording",
    value: function stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        try {
          this.mediaRecorder.stop();
        } catch (error) {
          console.error('Recording stop failed', error);
          this.cleanupRecording();
          throw error;
        }
      }
    }
  }, {
    key: "cleanupRecording",
    value: function cleanupRecording() {
      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }
      if (this.recordedMedia) {
        URL.revokeObjectURL(this.recordedMedia);
      }
      this.setRecordingTime(0);
    }
  }]);
}();
//# sourceMappingURL=MediaRecorderHelper.js.map
