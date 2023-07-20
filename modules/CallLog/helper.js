"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.keys");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;
exports.processData = processData;
exports.processRecords = processRecords;
var _callActions = require("../../enums/callActions");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function processData(data) {
  var _data$syncInfo;
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: (_data$syncInfo = data.syncInfo) === null || _data$syncInfo === void 0 ? void 0 : _data$syncInfo.syncToken
  };
}
function getISODateFrom(daySpan) {
  var d = (0, _getDateFrom["default"])(daySpan);
  return d.toISOString();
}
function getISODateTo(records) {
  var dateTo;
  records.forEach(function (call) {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
}
function processRecords() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var supplementRecords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ids = {};
  var output = [];
  function processCall(call) {
    if (call.id && !ids[call.id] && call.action !== _callActions.callActions.findMe) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var uri = call.uri,
        removeUriCall = _objectWithoutProperties(call, ["uri"]);
      output.push((0, _callLogHelpers.normalizeStartTime)(removeUriCall));
      ids[call.id] = true;
    }
  }
  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}
//# sourceMappingURL=helper.js.map
