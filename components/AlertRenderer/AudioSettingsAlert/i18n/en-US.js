"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _audioSettingsErrors$;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_audioSettingsErrors$ = {}, _defineProperty(_audioSettingsErrors$, _AudioSettings.audioSettingsErrors.userMediaPermission, 'Please grant {application} to access your audio.'), _defineProperty(_audioSettingsErrors$, _AudioSettings.audioSettingsErrors.ringtoneSizeOverLimit, "The file you're trying to upload is too large. Try one that's smaller than 5MB."), _defineProperty(_audioSettingsErrors$, _AudioSettings.audioSettingsErrors.duplicateRingtone, "The ringtone you're trying to add already exists."), _defineProperty(_audioSettingsErrors$, _AudioSettings.audioSettingsErrors.uploadRingtoneFailed, "We're having trouble adding your ringtone. Please try again."), _defineProperty(_audioSettingsErrors$, _AudioSettings.audioSettingsErrors.deleteRingtoneFailed, "We're having trouble deleting your ringtone. Please try again."), _audioSettingsErrors$);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
