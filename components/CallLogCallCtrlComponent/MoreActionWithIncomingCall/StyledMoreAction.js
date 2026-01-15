"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledReplyIcon = exports.StyledMenuList = exports.StyledArrowIcon = exports.StyledActionIcon = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledActionIcon = exports.StyledActionIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"])), (0, _juno.spacing)(2));
var StyledReplyIcon = exports.StyledReplyIcon = (0, _juno.styled)(StyledActionIcon)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  transform: rotateY(180deg);\n"])));
var StyledMenuList = exports.StyledMenuList = (0, _juno.styled)(_juno.RcMenuList)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", " {\n    width: 124px;\n  }\n"])), _juno.RcMenuItem);
var StyledArrowIcon = exports.StyledArrowIcon = (0, _juno.styled)(_juno.RcIconButton)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 8px;\n"])));
//# sourceMappingURL=StyledMoreAction.js.map
