"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Topic = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InnerTopic = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var name = _ref.name,
      currentLocale = _ref.currentLocale,
      defaultTopic = _ref.defaultTopic,
      updateMeetingTopic = _ref.updateMeetingTopic;

  var _useState = (0, _react.useState)(name || defaultTopic),
      _useState2 = _slicedToArray(_useState, 2),
      topic = _useState2[0],
      setTopic = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isTopicChange = _useState4[0],
      setIsTopicChange = _useState4[1];

  var inputRef = (0, _react.useRef)(); // DefaultTopic has translation, If user change browser language, defaultTopic need to be switch to corresponding language.
  // If user has input the topic custom. we don't need to update default topic anymore.

  (0, _react.useEffect)(function () {
    if (!isTopicChange) {
      setTopic(defaultTopic);
    }
  }, [defaultTopic, isTopicChange]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      value: topic
    };
  }, [topic]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    ref: inputRef,
    label: _i18n["default"].getString('topic', currentLocale),
    "data-sign": "topic",
    fullWidth: true,
    clearBtn: false,
    value: topic,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      setIsTopicChange(true);
      setTopic(e.target.value);
    },
    onBlur: function onBlur() {
      updateMeetingTopic(topic);
    },
    classes: {
      root: _styles["default"].input
    },
    gutterBottom: true
  });
});

var Topic = /*#__PURE__*/_react["default"].memo(InnerTopic, function (prevProps, nextProps) {
  return prevProps.name === nextProps.name && prevProps.currentLocale === nextProps.currentLocale;
});

exports.Topic = Topic;
//# sourceMappingURL=index.js.map
