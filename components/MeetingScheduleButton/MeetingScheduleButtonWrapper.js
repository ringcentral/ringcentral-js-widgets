"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduleButton = exports.MeetingScheduleButtonWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ScheduleButton = exports.ScheduleButton = (0, _juno.styled)(_juno.RcButton)(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
var MeetingScheduleButtonWrapper = exports.MeetingScheduleButtonWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  padding: 3px 20px 16px;\n  background-color: transparent;\n  box-shadow: none;\n\n  ", ";\n\n  ", " {\n    margin-top: 13px;\n  }\n"])), function (_ref) {
  var $hidden = _ref.$hidden;
  return $hidden ? (0, _juno.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          height: 100%;\n          margin-top: -20px;\n        "]))) : (0, _juno.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n          border-top: 1px solid ", ";\n          position: relative;\n          background-color: ", ";\n        "])), (0, _juno.palette2)('neutral', 'l02'), (0, _juno.palette2)('neutral', 'f01'));
}, ScheduleButton);
//# sourceMappingURL=MeetingScheduleButtonWrapper.js.map
