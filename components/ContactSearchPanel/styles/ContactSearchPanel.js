"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabText = exports.StyledTabsWrapper = exports.StyledListItemText = exports.StyledContactSearchPanel = exports.FullSizeWrapper = exports.DefaultIcon = exports.ContactName = exports.CallQueueIcon = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ContactName = exports.ContactName = _juno.styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  max-width: 92%;\n  vertical-align: middle;\n  ", ";\n  [sf-classic] & {\n    max-width: 80%;\n  }\n"])), _juno.ellipsis);
var StyledTabsWrapper = exports.StyledTabsWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-bottom: 1px solid ", ";\n  padding: 0 ", ";\n"])), (0, _juno.palette2)('neutral', 'l02'), (0, _juno.spacing)(2));
var StyledContactSearchPanel = exports.StyledContactSearchPanel = _juno.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: relative;\n  background: ", ";\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n\n  ", " {\n    div {\n      font-weight: normal;\n    }\n  }\n\n  [sf-classic] & {\n    ", " {\n      padding: 0;\n    }\n    ", " {\n      padding: ", ";\n    }\n    ", ":not(:last-child) {\n      ", ";\n      padding: ", ";\n      span {\n        ", "\n        display: inline-block;\n      }\n    }\n  }\n"])), (0, _juno.palette2)('neutral', 'f01'), _juno.RcAvatar, StyledTabsWrapper, _juno.RcTab, (0, _juno.spacing)(1), _juno.RcTab, (0, _juno.flexWidth)('81px'), (0, _juno.spacing)(1), _juno.ellipsis);
var FullSizeWrapper = exports.FullSizeWrapper = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n"])));
var DefaultIcon = exports.DefaultIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: ", ";\n"])), (0, _juno.palette2)('avatar', 'global'), (0, _juno.radius)('circle'));
var CallQueueIcon = exports.CallQueueIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: ", ";\n"])), (0, _juno.palette2)('primary', 'main'), (0, _juno.radius)('circle'));
var TabText = exports.TabText = _juno.styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  ", ";\n  font-size: 12px;\n"])), _juno.ellipsis);
var StyledListItemText = exports.StyledListItemText = (0, _juno.styled)(_juno.RcListItemText)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  && {\n    padding-left: ", ";\n  }\n  [sf-classic] & {\n    padding-left: ", ";\n  }\n"])), (0, _juno.spacing)(8), function (_ref) {
  var inset = _ref.inset;
  return inset && (0, _juno.spacing)(5);
});
//# sourceMappingURL=ContactSearchPanel.js.map
