"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledListItemText = exports.StyledHintsTitle = exports.HintsWrapper = exports.HelpTextSectionWrapper = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _Text = require("@ringcentral/juno/es6/components/Text/Text.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  line-height: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin-top: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HelpTextSectionWrapper = _styledComponents["default"].div(_templateObject(), (0, _spacing.spacing)(2));

exports.HelpTextSectionWrapper = HelpTextSectionWrapper;
var StyledHintsTitle = (0, _styledComponents["default"])(_Text.RcText)(_templateObject2(), (0, _spacing.spacing)(1));
exports.StyledHintsTitle = StyledHintsTitle;
var StyledListItemText = (0, _styledComponents["default"])(_ListItemText.RcListItemText)(_templateObject3(), (0, _spacing.spacing)(10));
exports.StyledListItemText = StyledListItemText;

var HintsWrapper = _styledComponents["default"].div(_templateObject4(), (0, _spacing.spacing)(4));

exports.HintsWrapper = HintsWrapper;
//# sourceMappingURL=HelpTextSection.js.map
