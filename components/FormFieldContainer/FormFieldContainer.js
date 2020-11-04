"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormFieldContainer = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.string.bold");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _iconInfo = _interopRequireDefault(require("@ringcentral/juno/icons/icon-info.svg"));

var _interface = require("./interface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  & {\n    display: block;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  & {\n    ", ";\n    color: #7575;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  & {\n    ", ";\n    color: #6c7489;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  & {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n\n    * + * {\n      margin-left: ", ";\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    display: block;\n    max-width: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledContainer = (0, _juno.styled)('section')(_templateObject());
var LabelRow = (0, _juno.styled)('section')(_templateObject2(), (0, _juno.spacing)(3));
var StyledLabelBold = (0, _juno.styled)('label')(_templateObject3(), (0, _juno.typography)('caption2'));
var StyledLabel = (0, _juno.styled)('label')(_templateObject4(), (0, _juno.typography)('caption1'));
var FieldRow = (0, _juno.styled)('section')(_templateObject5());

var FormFieldContainer = function FormFieldContainer(props) {
  var htmlFor = props.htmlFor,
      label = props.label,
      children = props.children,
      tooltip = props.tooltip,
      labelVariant = props.labelVariant,
      ariaOwns = props.ariaOwns;
  var LabelComp = labelVariant === _interface.labelVariant.bold ? StyledLabelBold : StyledLabel;
  return /*#__PURE__*/_react["default"].createElement(StyledContainer, {
    "aria-owns": "".concat(ariaOwns, " ").concat(label)
  }, /*#__PURE__*/_react["default"].createElement(LabelRow, null, /*#__PURE__*/_react["default"].createElement(LabelComp, {
    htmlFor: htmlFor,
    id: label
  }, label), !!tooltip && /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "plain",
    size: "small",
    color: "grey.400",
    "data-sign": "info",
    symbol: _iconInfo["default"],
    tooltipTitle: tooltip
  })), /*#__PURE__*/_react["default"].createElement(FieldRow, null, children));
};

exports.FormFieldContainer = FormFieldContainer;
FormFieldContainer.defaultProps = {
  labelVariant: _interface.labelVariant.normal,
  ariaOwns: ''
};
//# sourceMappingURL=FormFieldContainer.js.map
