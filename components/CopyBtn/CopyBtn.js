"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyBtn = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _iconCopy = _interopRequireDefault(require("@ringcentral/juno/icons/icon-copy.svg"));

var _CopyToClipboard = _interopRequireDefault(require("../CopyToClipboard"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    width: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BtnContainer = (0, _juno.styled)('div')(_templateObject(), (0, _juno.spacing)(8));

var InnerBtn = function InnerBtn(props) {
  var currentLocale = props.currentLocale,
      executeCopy = props.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: "small",
    color: "grey.400",
    "data-sign": "copyBtn",
    symbol: _iconCopy["default"],
    tooltipTitle: _i18n["default"].getString('copy', currentLocale),
    onClick: executeCopy
  });
};

var CopyBtn = function CopyBtn(props) {
  var value = props.value,
      currentLocale = props.currentLocale,
      handleSuccess = props.handleSuccess,
      handleFailure = props.handleFailure;
  var memoizedBtn = (0, _react.useCallback)(function (_ref) {
    var executeCopy = _ref.executeCopy;
    return /*#__PURE__*/_react["default"].createElement(InnerBtn, {
      currentLocale: currentLocale,
      executeCopy: executeCopy
    });
  }, [currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(BtnContainer, null, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"], {
    currentLocale: currentLocale,
    copiedText: value,
    button: memoizedBtn,
    handleSuccess: handleSuccess,
    handleFailure: handleFailure
  }));
};

exports.CopyBtn = CopyBtn;
CopyBtn.defaultProps = {
  handleSuccess: function handleSuccess() {},
  handleFailure: function handleFailure() {},
  currentLocale: 'en-US',
  value: ''
};
//# sourceMappingURL=CopyBtn.js.map
