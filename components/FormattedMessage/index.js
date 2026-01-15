"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var FormattedMessage = function FormattedMessage(props) {
  var message = props.message,
    _props$values = props.values,
    values = _props$values === void 0 ? {} : _props$values,
    _props$tagName = props.tagName,
    Component = _props$tagName === void 0 ? 'span' : _props$tagName;
  var nodes = (0, _react.useMemo)(function () {
    var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
    var hashedParams = {};
    var elements = {};
    var tokenDelimiter = "@__".concat(uid, "__@");
    Object.keys(values).forEach(function (key) {
      if (/*#__PURE__*/(0, _react.isValidElement)(values[key])) {
        hashedParams[key] = "".concat(tokenDelimiter).concat(key).concat(tokenDelimiter);
        elements[key] = values[key];
      } else {
        hashedParams[key] = values[key];
      }
    });
    var nodes = (0, _utils.format)(message, hashedParams).split(tokenDelimiter).filter(function (token) {
      return !!token;
    }).map(function (token, i) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
        key: i
      }, elements[token] || token);
    });
    return nodes;
  }, [message, values]);
  return /*#__PURE__*/_react["default"].createElement(Component, null, nodes);
};
var _default = exports["default"] = FormattedMessage;
//# sourceMappingURL=index.js.map
