"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = exports.NO_NUMBER_REGEX = exports.PASSWORD_REGEX = exports.MAX_TOPIC_LENGTH = exports.HOUR_SCALE = exports.MINUTE_SCALE = void 0;
var MINUTE_SCALE = 4;
exports.MINUTE_SCALE = MINUTE_SCALE;
var HOUR_SCALE = 13;
exports.HOUR_SCALE = HOUR_SCALE;
var MAX_TOPIC_LENGTH = 128;
exports.MAX_TOPIC_LENGTH = MAX_TOPIC_LENGTH;
var PASSWORD_REGEX = /^[A-Za-z0-9]{0,10}$/;
exports.PASSWORD_REGEX = PASSWORD_REGEX;
var NO_NUMBER_REGEX = /[^\d]/g;
exports.NO_NUMBER_REGEX = NO_NUMBER_REGEX;

var isSafari = function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

exports.isSafari = isSafari;
//# sourceMappingURL=constants.js.map