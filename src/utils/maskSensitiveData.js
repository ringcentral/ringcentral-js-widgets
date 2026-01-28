"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskEmail = maskEmail;
exports.maskIdNumber = maskIdNumber;
exports.maskPhoneNumber = maskPhoneNumber;
exports.maskSensitiveData = maskSensitiveData;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.string.repeat.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Mask sensitive data - hide sensitive information
 * @param value Value to be masked
 * @param visibleLength Length to display from the beginning
 * @param maskChar Character used for masking
 * @returns Masked string
 */
function maskSensitiveData(value) {
  var visibleLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var maskChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  if (!value) return '***';
  var str = String(value);
  if (str.length <= visibleLength) {
    return maskChar.repeat(str.length);
  }
  var visiblePart = str.substring(0, visibleLength);
  var maskedPart = maskChar.repeat(str.length - visibleLength);
  return visiblePart + maskedPart;
}

/**
 * Mask phone number - show first 3 and last 4 digits
 * @param phoneNumber Phone number to mask
 * @returns Masked phone number
 */
function maskPhoneNumber(phoneNumber) {
  if (!phoneNumber) return '***';
  var str = String(phoneNumber);
  if (str.length <= 7) {
    return maskSensitiveData(str, 3);
  }
  var visibleStart = str.substring(0, 3);
  var visibleEnd = str.substring(str.length - 4);
  var maskedMiddle = '*'.repeat(str.length - 7);
  return visibleStart + maskedMiddle + visibleEnd;
}

/**
 * Mask email - show first 2 characters of username and domain
 * @param email Email address to mask
 * @returns Masked email
 */
function maskEmail(email) {
  if (!email) return '***';
  var _email$split = email.split('@'),
    _email$split2 = _slicedToArray(_email$split, 2),
    username = _email$split2[0],
    domain = _email$split2[1];
  if (!username || !domain) {
    // For invalid emails, show first 2 characters and mask the rest
    var visiblePart = email.substring(0, 2);
    var maskedPart = '*'.repeat(Math.max(0, email.length - 2));
    return visiblePart + maskedPart;
  }
  if (username.length <= 2) {
    var _visibleUsername = username.substring(0, 1);
    var _maskedUsername = '*'.repeat(Math.max(1, username.length - 1));
    return "".concat(_visibleUsername).concat(_maskedUsername, "@").concat(domain);
  }
  var visibleUsername = username.substring(0, 2);
  var maskedUsername = '*'.repeat(username.length - 2);
  return "".concat(visibleUsername).concat(maskedUsername, "@").concat(domain);
}

/**
 * Mask ID number - show first 4 and last 4 digits
 * @param idNumber ID number to mask
 * @returns Masked ID number
 */
function maskIdNumber(idNumber) {
  if (!idNumber) return '***';
  var str = String(idNumber);
  if (str.length <= 8) {
    return maskSensitiveData(str, 4);
  }
  var visibleStart = str.substring(0, 4);
  var visibleEnd = str.substring(str.length - 4);
  var maskedMiddle = '*'.repeat(str.length - 8);
  return visibleStart + maskedMiddle + visibleEnd;
}
//# sourceMappingURL=maskSensitiveData.js.map
