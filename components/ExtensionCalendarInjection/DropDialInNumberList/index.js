"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DropAdditionalValues = _interopRequireDefault(require("../DropAdditionalValues"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DropDialInNumberList(_ref) {
  var open = _ref.open,
      dialInNumbers = _ref.dialInNumbers,
      selected = _ref.selected,
      onChange = _ref.onChange;

  if (dialInNumbers.length === 0) {
    return '';
  }

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].dropdown, open && _styles["default"].open)
  }, _react["default"].createElement(_DropAdditionalValues["default"], {
    dialInNumbers: dialInNumbers,
    selected: selected,
    onChange: onChange,
    withCheckbox: true
  }));
}

DropDialInNumberList.propTypes = {
  dialInNumbers: _propTypes["default"].array.isRequired,
  selected: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  open: _propTypes["default"].bool
};
DropDialInNumberList.defaultProps = {
  open: false
};
var _default = DropDialInNumberList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
