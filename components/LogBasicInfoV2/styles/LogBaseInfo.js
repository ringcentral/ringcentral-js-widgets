"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubInfoWrapper = exports.SubInfoName = exports.StyledTransferSwitchButton = exports.StyledSubSide = exports.StyledSubRecordingIndicator = exports.StyledSide = exports.StyledParticipantsButton = exports.StyleSubBox = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var SubInfoWrapper = exports.SubInfoWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  align-items: center;\n  padding-bottom: 1px;\n"])), _commonStyles.fullSizeStyle);
var SubInfoName = exports.SubInfoName = (0, _juno.styled)(_juno.RcText)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin: 0 10px;\n  font-size: ", ";\n  color: #212121;\n  flex-grow: 1;\n"])), function (_ref) {
  var $isWide = _ref.$isWide;
  return $isWide ? '18px' : "".concat((0, _juno.spacing)(2));
});
var StyledTransferSwitchButton = exports.StyledTransferSwitchButton = (0, _juno.styled)(_juno.RcIconButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  right: ", ";\n  margin-top: ", ";\n  z-index: 1;\n"])), (0, _juno.spacing)(5), (0, _juno.spacing)(-4));
var StyledSide = exports.StyledSide = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  line-height: 16px;\n  justify-content: flex-end;\n  margin-bottom: ", ";\n"])), (0, _juno.spacing)(2));
var StyleSubBox = exports.StyleSubBox = _juno.styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  position: relative;\n"])));
var StyledSubSide = exports.StyledSubSide = _juno.styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n  color: ", ";\n  font-size: ", ";\n  margin-bottom: ", ";\n"])), (0, _juno.palette2)('neutral', 'f03'), (0, _juno.spacing)(3), (0, _juno.spacing)(1));
var StyledSubRecordingIndicator = exports.StyledSubRecordingIndicator = _juno.styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  padding-left: ", ";\n"])), (0, _juno.spacing)(1));
var StyledParticipantsButton = exports.StyledParticipantsButton = (0, _juno.styled)(_juno.RcButton)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  && {\n    font-size: 12px;\n    margin-left: ", ";\n    padding: ", ";\n    min-height: 22px;\n    background-color: #ffffff;\n    :hover {\n      background-color: #ffffff;\n    }\n\n    ", " {\n      margin-right: ", ";\n    }\n  }\n"])), (0, _juno.spacing)(1), (0, _juno.spacing)(0, 2), _juno.RcIcon, (0, _juno.spacing)(1));
//# sourceMappingURL=LogBaseInfo.js.map
