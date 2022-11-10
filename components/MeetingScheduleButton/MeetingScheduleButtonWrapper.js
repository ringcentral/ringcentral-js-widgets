"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduleButton = exports.MeetingScheduleButtonWrapper = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          border-top: 1px solid ", ";\n          position: relative;\n          background-color: ", ";\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          height: 100%;\n          margin-top: -20px;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  padding: 3px 20px 16px;\n  background-color: transparent;\n  box-shadow: none;\n\n  ", ";\n\n  ", " {\n    margin-top: 13px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ScheduleButton = (0, _juno.styled)(_juno.RcButton)(_templateObject());
exports.ScheduleButton = ScheduleButton;

var MeetingScheduleButtonWrapper = _juno.styled.div(_templateObject2(), function (_ref) {
  var $hidden = _ref.$hidden;
  return $hidden ? (0, _juno.css)(_templateObject3()) : (0, _juno.css)(_templateObject4(), (0, _juno.palette2)('neutral', 'l02'), (0, _juno.palette2)('neutral', 'f01'));
}, ScheduleButton);

exports.MeetingScheduleButtonWrapper = MeetingScheduleButtonWrapper;
//# sourceMappingURL=MeetingScheduleButtonWrapper.js.map
