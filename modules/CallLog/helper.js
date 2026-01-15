"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;
exports.processData = processData;
exports.processRecords = processRecords;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _callActions = require("../../enums/callActions");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
var _excluded = ["uri"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
        removeUriCall = _objectWithoutProperties(call, _excluded);
      output.push((0, _callLogHelpers.normalizeStartTime)(removeUriCall));
      ids[call.id] = true;
    }
  }
  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}
//# sourceMappingURL=helper.js.map
