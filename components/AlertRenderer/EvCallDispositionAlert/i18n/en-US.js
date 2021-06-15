"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _logTypes = require("../../../../enums/logTypes");

var _logTypes$CALL_DISPOS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_logTypes$CALL_DISPOS = {}, _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_SUCCESS, 'Log is saved successfully.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_DISPOSITION_FAILURE, 'Failed to log, try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_SUCCESS, 'Call log created.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_CREATE_FAILURE, 'Failed to create log. Try again later.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_SUCCESS, 'Call log updated.'), _defineProperty(_logTypes$CALL_DISPOS, _logTypes.logTypes.CALL_LOG_UPDATE_FAILURE, 'Failed to update log. Try again later.'), _logTypes$CALL_DISPOS);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
