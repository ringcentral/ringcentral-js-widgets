"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

require("core-js/modules/es6.array.slice");

var _react = _interopRequireWildcard(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _Copy = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Copy.js"));

var _CopyToClipboard = _interopRequireDefault(require("../CopyToClipboard"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    width: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BtnContainer = (0, _styledComponents["default"])('div')(_templateObject(), (0, _spacing.spacing)(8));

var InnerBtn = function InnerBtn(_ref) {
  var size = _ref.size,
      currentLocale = _ref.currentLocale,
      executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    variant: "round",
    size: size,
    color: "neutral.f04",
    "data-sign": "copyBtn",
    symbol: _Copy["default"],
    title: _i18n["default"].getString('copy', currentLocale),
    onClick: executeCopy
  });
};

var CopyBtn = function CopyBtn(_ref2) {
  var value = _ref2.value,
      size = _ref2.size,
      currentLocale = _ref2.currentLocale,
      handleSuccess = _ref2.handleSuccess,
      handleFailure = _ref2.handleFailure;
  var memoizedBtn = (0, _react.useCallback)(function (_ref3) {
    var executeCopy = _ref3.executeCopy;
    return /*#__PURE__*/_react["default"].createElement(InnerBtn, {
      size: size,
      currentLocale: currentLocale,
      executeCopy: executeCopy
    });
  }, [size, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(BtnContainer, {
    "aria-disabled": true
  }, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"], {
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
  value: '',
  size: 'small'
};
//# sourceMappingURL=CopyBtn.js.map
