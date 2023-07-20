"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSendIcon = exports.TimeOptionItem = exports.StyledCustomMessage = exports.SendIcon = exports.ReplyWithMessagePage = exports.ReplyOptionsList = exports.ReplyOptionItem = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  padding-top: ", ";\n  padding-bottom: ", ";\n  &:hover {\n    ", " {\n      visibility: visible;\n    }\n  }\n"]);
  _templateObject7 = function _templateObject7() {
    return data;
  };
  return data;
}
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  visibility: hidden;\n"]);
  _templateObject6 = function _templateObject6() {
    return data;
  };
  return data;
}
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  margin-top: ", ";\n  position: absolute;\n  bottom: 0;\n  label {\n    padding-left: ", ";\n  }\n"]);
  _templateObject5 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  padding-top: ", ";\n  padding-bottom: ", ";\n  &:hover {\n    ", " {\n      display: flex;\n    }\n  }\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: none;\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-top: ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  z-index: 21;\n  height: 100%;\n  background-color: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var ReplyWithMessagePage = _juno.styled.div(_templateObject(), (0, _juno.palette2)('neutral', 'b01'));
exports.ReplyWithMessagePage = ReplyWithMessagePage;
var ReplyOptionsList = (0, _juno.styled)(_juno.RcList)(_templateObject2(), (0, _juno.spacing)(8));
exports.ReplyOptionsList = ReplyOptionsList;
var SendIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject3());
exports.SendIcon = SendIcon;
var ReplyOptionItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject4(), (0, _juno.spacing)(2), (0, _juno.spacing)(2), SendIcon);
exports.ReplyOptionItem = ReplyOptionItem;
var StyledCustomMessage = (0, _juno.styled)(_juno.RcTextarea)(_templateObject5(), (0, _juno.spacing)(0, 4, 8, 4), (0, _juno.spacing)(14), (0, _juno.spacing)(4));
exports.StyledCustomMessage = StyledCustomMessage;
var TimeSendIcon = (0, _juno.styled)(_juno.RcIcon)(_templateObject6());
exports.TimeSendIcon = TimeSendIcon;
var TimeOptionItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject7(), (0, _juno.spacing)(2), (0, _juno.spacing)(2), TimeSendIcon);
exports.TimeOptionItem = TimeOptionItem;
//# sourceMappingURL=style.js.map
