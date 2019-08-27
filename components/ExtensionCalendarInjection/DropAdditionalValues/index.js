"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CloseButton = _interopRequireDefault(require("../CloseButton"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DropAdditionalValues(_ref) {
  var dialInNumbers = _ref.dialInNumbers,
      selected = _ref.selected,
      onChange = _ref.onChange,
      withCheckbox = _ref.withCheckbox;

  if (dialInNumbers.length === 0) {
    return '';
  }

  return _react["default"].createElement("ul", {
    className: _styles["default"].dropAdditionalValues
  }, dialInNumbers.map(function (item) {
    var checked = selected.indexOf(item.phoneNumber) > -1;

    var selectChange = function selectChange() {
      var newSelection = [];

      if (checked) {
        selected.forEach(function (curNum) {
          return curNum !== item.phoneNumber && newSelection.push(curNum);
        });
      } else {
        newSelection = selected.concat(item.phoneNumber);
      }

      onChange(newSelection);
    };

    if (withCheckbox) {
      return _react["default"].createElement("li", {
        key: item.phoneNumber,
        title: item.region,
        onClick: selectChange
      }, _react["default"].createElement(_Checkbox["default"], {
        className: _styles["default"].regionCkb,
        checked: checked,
        label: item.region,
        size: "xsmall"
      }), _react["default"].createElement("div", {
        className: _styles["default"].phoneNumber
      }, item.formattedPhoneNumber));
    }

    return _react["default"].createElement("li", {
      key: item.phoneNumber,
      title: item.region,
      className: _styles["default"].selectedItemWrapper
    }, _react["default"].createElement("div", {
      className: _styles["default"].regionText
    }, item.region), _react["default"].createElement("div", {
      className: _styles["default"].phoneNumber
    }, item.formattedPhoneNumber), _react["default"].createElement(_CloseButton["default"], {
      onClick: selectChange
    }));
  }));
}

DropAdditionalValues.propTypes = {
  dialInNumbers: _propTypes["default"].array.isRequired,
  selected: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  withCheckbox: _propTypes["default"].bool
};
DropAdditionalValues.defaultProps = {
  withCheckbox: false
};
var _default = DropAdditionalValues;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
