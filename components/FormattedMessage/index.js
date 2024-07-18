"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
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
      if ( /*#__PURE__*/(0, _react.isValidElement)(values[key])) {
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
var _default = FormattedMessage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
