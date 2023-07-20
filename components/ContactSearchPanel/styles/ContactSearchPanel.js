"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabText = exports.StyledTabsWrapper = exports.StyledListItemText = exports.StyledContactSearchPanel = exports.FullSizeWrapper = exports.DefaultIcon = exports.ContactName = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  && {\n    padding-left: ", ";\n  }\n  [sf-classic] & {\n    padding-left: ", ";\n  }\n"]);
  _templateObject7 = function _templateObject7() {
    return data;
  };
  return data;
}
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  font-size: 12px;\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: ", ";\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  background: ", ";\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n\n  ", " {\n    div {\n      font-weight: normal;\n    }\n  }\n\n  [sf-classic] & {\n    ", " {\n      padding: ", ";\n    }\n    ", ":not(:last-child) {\n      ", ";\n      padding: ", ";\n      span {\n        ", "\n        display: inline-block;\n      }\n    }\n  }\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border-bottom: 1px solid ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  max-width: 92%;\n  vertical-align: middle;\n  ", ";\n  [sf-classic] & {\n    max-width: 80%;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var ContactName = _juno.styled.span(_templateObject(), _juno.ellipsis);
exports.ContactName = ContactName;
var StyledTabsWrapper = _juno.styled.div(_templateObject2(), (0, _juno.palette2)('neutral', 'l02'));
exports.StyledTabsWrapper = StyledTabsWrapper;
var StyledContactSearchPanel = _juno.styled.div(_templateObject3(), (0, _juno.palette2)('neutral', 'f01'), _juno.RcAvatar, _juno.RcTab, (0, _juno.spacing)(1), _juno.RcTab, (0, _juno.flexWidth)('81px'), (0, _juno.spacing)(1), _juno.ellipsis);
exports.StyledContactSearchPanel = StyledContactSearchPanel;
var FullSizeWrapper = _juno.styled.div(_templateObject4());
exports.FullSizeWrapper = FullSizeWrapper;
var DefaultIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject5(), (0, _juno.palette2)('avatar', 'global'), (0, _juno.radius)('circle'));
exports.DefaultIcon = DefaultIcon;
var TabText = _juno.styled.div(_templateObject6(), _juno.ellipsis);
exports.TabText = TabText;
var StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject7(), (0, _juno.spacing)(8), function (_ref) {
  var inset = _ref.inset;
  return inset && (0, _juno.spacing)(5);
});
exports.StyledListItemText = StyledListItemText;
//# sourceMappingURL=ContactSearchPanel.js.map
