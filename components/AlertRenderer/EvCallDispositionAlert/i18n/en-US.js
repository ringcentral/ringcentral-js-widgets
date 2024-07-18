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
var _logTypes = require("../../../../enums/logTypes");
var _logTypes$CALL_DISPOS;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_logTypes$CALL_DISPOS = {}, _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_SUCCESS, 'Log is saved successfully.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_FAILURE, 'Failed to log, try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_SUCCESS, 'Call log created.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_FAILURE, 'Failed to create log. Try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_SUCCESS, 'Call log updated.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_FAILURE, 'Failed to update log. Try again later.'), _logTypes$CALL_DISPOS);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
