"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceItem = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _getPresenceStatusName = require("../../lib/getPresenceStatusName");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  padding-right: ", ";\n  font-size: 13px;\n\n  ", " {\n    margin-right: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject(), (0, _juno.spacing)(2), (0, _juno.spacing)(2), _juno.RcPresence, (0, _juno.spacing)(1.5));
var PresenceItem = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var selected = _ref.selected,
      classNameProp = _ref.className,
      userStatus = _ref.userStatus,
      dndStatus = _ref.dndStatus,
      onClick = _ref.onClick,
      type = _ref.type,
      currentLocale = _ref.currentLocale;
  var name = (0, _getPresenceStatusName.getPresenceStatusName)(userStatus, dndStatus, currentLocale);
  return /*#__PURE__*/_react["default"].createElement(StyledListItem, {
    ref: ref,
    selected: selected,
    disableGutters: true,
    className: classNameProp,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcPresence, {
    size: "medium",
    type: type
  }), /*#__PURE__*/_react["default"].createElement("span", null, name));
});
exports.PresenceItem = PresenceItem;
//# sourceMappingURL=index.js.map
