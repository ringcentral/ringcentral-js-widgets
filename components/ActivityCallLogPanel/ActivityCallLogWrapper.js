"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitButtonWrapper = exports.StyledAgentScriptIcon = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _px = require("@ringcentral/juno/es6/foundation/styles/px.js");

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo");

var _variables = require("../../scss/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: ", ";\n  display: flex;\n  align-items: center;\n  ", ";\n  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 16px;\n  top: 50px;\n  z-index: 2;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledAgentScriptIcon = (0, _styledComponents["default"])(_IconButton.RcIconButton)(_templateObject());
exports.StyledAgentScriptIcon = StyledAgentScriptIcon;

var SubmitButtonWrapper = _styledComponents["default"].div(_templateObject2(), (0, _px.px)(_BasicCallInfo.SubmitButtonHeight), (0, _variables.pageSpace)('padding'));

exports.SubmitButtonWrapper = SubmitButtonWrapper;
//# sourceMappingURL=ActivityCallLogWrapper.js.map
