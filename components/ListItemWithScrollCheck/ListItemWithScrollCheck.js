"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.ListItemWithScrollCheck = void 0;

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ListItemWithScrollCheck = function ListItemWithScrollCheck(_ref) {
  var selected = _ref.selected,
      _onClick = _ref.onClick,
      children = _ref.children,
      scrollCheck = _ref.scrollCheck,
      className = _ref.className;
  var selectElm = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (selected && scrollCheck) {
      scrollCheck(selectElm.current);
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
    innerRef: selectElm,
    button: true,
    selected: selected,
    classes: {
      root: (0, _classnames["default"])(_styles["default"].listItem, className)
    },
    onClick: function onClick(e) {
      e.preventDefault();

      _onClick();
    }
  }, children);
};

exports.ListItemWithScrollCheck = ListItemWithScrollCheck;
//# sourceMappingURL=ListItemWithScrollCheck.js.map
