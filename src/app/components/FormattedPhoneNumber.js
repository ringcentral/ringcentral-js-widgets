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
exports.useFormattedPhoneNumberFn = exports.useFormattedPhoneNumber = exports.FormattedPhoneNumber = void 0;
require("core-js/modules/es.function.bind.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var useFormattedPhoneNumberFn = exports.useFormattedPhoneNumberFn = function useFormattedPhoneNumberFn() {
  var numberFormatter = (0, _nextCore.useContainer)('NumberFormatter');
  return (0, _react.useMemo)(function () {
    return numberFormatter.formatNumber.bind(numberFormatter);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [numberFormatter,
  // when formattingParams changed, we need to reformat the phone number
  numberFormatter.formattingParams]);
};
var useFormattedPhoneNumber = exports.useFormattedPhoneNumber = function useFormattedPhoneNumber(phoneNumber) {
  var numberFormatter = useFormattedPhoneNumberFn();
  return (0, _react.useMemo)(function () {
    return typeof phoneNumber === 'string' ? numberFormatter(phoneNumber) : undefined;
  }, [numberFormatter, phoneNumber]);
};

/**
 * use NumberFormatter to format phone number, that will inject DI, so only work inside reactant DI environment
 */
var FormattedPhoneNumber = exports.FormattedPhoneNumber = function FormattedPhoneNumber(_ref) {
  var phoneNumber = _ref.phoneNumber;
  var formattedNumber = useFormattedPhoneNumber(phoneNumber);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, formattedNumber);
};
//# sourceMappingURL=FormattedPhoneNumber.js.map
