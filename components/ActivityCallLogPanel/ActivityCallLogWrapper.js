"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitButtonWrapper = exports.StyledAgentScriptIcon = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _BasicCallInfo = require("@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo");

var _variables = require("../../scss/variables");

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

var StyledAgentScriptIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject());
exports.StyledAgentScriptIcon = StyledAgentScriptIcon;

var SubmitButtonWrapper = _juno.styled.div(_templateObject2(), (0, _juno.px)(_BasicCallInfo.SubmitButtonHeight), (0, _variables.pageSpace)('padding'));

exports.SubmitButtonWrapper = SubmitButtonWrapper;
//# sourceMappingURL=ActivityCallLogWrapper.js.map
