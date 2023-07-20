"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _react = _interopRequireWildcard(require("react"));
var _utils = require("@ringcentral-integration/utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
