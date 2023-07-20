"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Button = require("../Button");
var _Spinner = _interopRequireDefault(require("../Spinner"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var EntityButton = function EntityButton(_ref) {
  var className = _ref.className,
    onViewEntity = _ref.onViewEntity,
    onCreateEntity = _ref.onCreateEntity,
    hasEntity = _ref.hasEntity,
    isCreating = _ref.isCreating,
    disableLinks = _ref.disableLinks,
    viewEntityTitle = _ref.viewEntityTitle,
    createEntityTitle = _ref.createEntityTitle;
  // console.debug('isCreating', isCreating);
  var spinner = isCreating ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].spinnerContainer
  }, /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
    ringWidth: 2
  })) : null;
  var icon = hasEntity ? _DynamicsFont["default"].record : _DynamicsFont["default"].addEntity;
  var onClick = hasEntity ? onViewEntity : onCreateEntity;
  var title = hasEntity ? viewEntityTitle : createEntityTitle;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].entity, className),
    onClick: onClick,
    disabled: disableLinks,
    dataSign: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: icon,
    title: title
  }), spinner);
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  isCreating: false,
  disableLinks: false,
  viewEntityTitle: undefined,
  createEntityTitle: undefined
};
var _default = EntityButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
