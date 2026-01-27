"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormattedDateTime = exports.useFormatDuration = exports.FormattedDateTime = void 0;
require("core-js/modules/es.object.values.js");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var useFormattedDateTime = exports.useFormattedDateTime = function useFormattedDateTime() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var dateTimeFormat = (0, _nextCore.useContainer)('DateTimeFormat');
  return (0, _react.useMemo)(function () {
    return options && dateTimeFormat.formatDateTime(options);
  }, /* eslint-disable react-hooks/exhaustive-deps */
  [dateTimeFormat,
  // only compare values
  Object.values(options),
  // also listen to locale change
  dateTimeFormat['_locale'].locale]);
};

/**
 * use `FormattedDateTime` to format date time, that will inject DI, so only work inside reactant DI environment
 */
var FormattedDateTime = exports.FormattedDateTime = function FormattedDateTime(props) {
  var formattedDateTime = useFormattedDateTime(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, formattedDateTime);
};
var useFormatDuration = exports.useFormatDuration = function useFormatDuration(duration, invalidDisplay) {
  return (0, _react.useMemo)(function () {
    return (0, _formatDuration.formatDuration)(duration, invalidDisplay);
  }, [duration, invalidDisplay]);
};
//# sourceMappingURL=FormattedDateTime.js.map
