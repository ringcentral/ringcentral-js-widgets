"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Topic = void 0;
require("react-widgets/dist/css/react-widgets.css");
var _react = _interopRequireDefault(require("react"));
var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));
var _constants = require("./constants");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MeetingTopic = function MeetingTopic(_ref) {
  var update = _ref.update,
    currentLocale = _ref.currentLocale,
    meeting = _ref.meeting,
    that = _ref.that;
  return /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    hideTopBorderLine: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inline
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, _i18n["default"].getString('topic', currentLocale)), /*#__PURE__*/_react["default"].createElement("input", {
    ref: function ref(_ref3) {
      that.topic = _ref3;
    },
    onPaste: function onPaste(event) {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'EventTarg... Remove this comment to see the full error message
      var topic = event.target.value;
      event.preventDefault();
      event.clipboardData.items[0].getAsString(function (data) {
        var isOverLength = topic.length >= 0 && topic.length <= _constants.MAX_TOPIC_LENGTH;
        var positionStart = that.topic.selectionStart;
        var positionEnd = that.topic.selectionEnd;
        var select = positionEnd - positionStart;
        var restLength = _constants.MAX_TOPIC_LENGTH - topic.length + select;
        var isOver = isOverLength && restLength > 0;
        if (isOver) {
          var _isOverLength = restLength >= data.length;
          var insertText = _isOverLength ? data : data.slice(0, !isOver ? select : restLength);
          var value = topic.split('');
          value.splice(positionStart, select, insertText);
          that.topic.value = value.join('');
          var newPosition = positionStart + insertText.length;
          that.topic.setSelectionRange(newPosition, newPosition);
        }
        update(_objectSpread(_objectSpread({}, meeting), {}, {
          topic: that.topic.value
        }));
      });
    },
    type: "text",
    className: _styles["default"].input,
    defaultValue: meeting.topic || '',
    onChange: function onChange(_ref2) {
      var target = _ref2.target;
      var topic = target.value;
      if (topic.length >= 0 && topic.length <= _constants.MAX_TOPIC_LENGTH) {
        clearTimeout(that.topicSetTimeoutId);
        that.topicSetTimeoutId = setTimeout(function () {
          update(_objectSpread(_objectSpread({}, meeting), {}, {
            topic: topic
          }));
        }, 10);
      } else {
        target.value = meeting.topic || '';
      }
    },
    "data-sign": "scheduleMeetingTopic"
  })));
};
exports.Topic = MeetingTopic;
//# sourceMappingURL=MeetingTopic.js.map
