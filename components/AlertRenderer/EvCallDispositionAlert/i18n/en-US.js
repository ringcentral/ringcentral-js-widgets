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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_logTypes$CALL_DISPOS = {}, _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_SUCCESS, 'Log is saved successfully.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_FAILURE, 'Failed to log, try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_SUCCESS, 'Call log created.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_FAILURE, 'Failed to create log. Try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_SUCCESS, 'Call log updated.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_FAILURE, 'Failed to update log. Try again later.'), _logTypes$CALL_DISPOS);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
