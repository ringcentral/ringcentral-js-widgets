"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_TYPE = exports.TEST_STATE = exports.MEDIA_TYPE = exports.MAX_RECORDING_TIME = exports.MAX_RECORDING_SECS = exports.LEVEL_CHECK_INTERVAL = void 0;
var LEVEL_CHECK_INTERVAL = exports.LEVEL_CHECK_INTERVAL = 50;
var MAX_RECORDING_SECS = exports.MAX_RECORDING_SECS = 12;
var MAX_RECORDING_TIME = exports.MAX_RECORDING_TIME = MAX_RECORDING_SECS * 1000;
var MEDIA_TYPE = exports.MEDIA_TYPE = 'audio/webm;codecs=opus';
var TEST_STATE = exports.TEST_STATE = /*#__PURE__*/function (TEST_STATE) {
  TEST_STATE[TEST_STATE["IDLE"] = 0] = "IDLE";
  TEST_STATE[TEST_STATE["RECORDS_AUDIO"] = 1] = "RECORDS_AUDIO";
  TEST_STATE[TEST_STATE["PLAYS_AUDIO"] = 2] = "PLAYS_AUDIO";
  return TEST_STATE;
}({});
var TEST_TYPE = exports.TEST_TYPE = /*#__PURE__*/function (TEST_TYPE) {
  TEST_TYPE["microphone"] = "microphone";
  TEST_TYPE["speaker"] = "speaker";
  return TEST_TYPE;
}({});
//# sourceMappingURL=const.js.map
