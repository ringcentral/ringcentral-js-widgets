"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoList = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _classnames = _interopRequireDefault(require("classnames"));

var _CallInfo = require("../CallInfo");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CopyToClipboard = _interopRequireDefault(require("../../CopyToClipboard"));

var _CopyButton = _interopRequireDefault(require("../../CopyButton/CopyButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallInfoList = function CallInfoList(_ref) {
  var callInfos = _ref.callInfos,
      className = _ref.className,
      onCopySuccess = _ref.onCopySuccess,
      currentLocale = _ref.currentLocale;
  if (!callInfos || callInfos.length === 0) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "infoList",
    className: className
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcList, null, callInfos.map(function (_ref2, i) {
    var attr = _ref2.attr,
        name = _ref2.name,
        content = _ref2.content,
        enableCopy = _ref2.enableCopy;
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcListItem, {
      key: i,
      className: (0, _classnames["default"])(_styles["default"].listItem),
      button: false
    }, /*#__PURE__*/_react["default"].createElement(_CallInfo.CallInfo, {
      name: name,
      content: content
    }), enableCopy && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].copyBtn
    }, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"], {
      handleSuccess: function handleSuccess() {
        return onCopySuccess(attr);
      },
      currentLocale: currentLocale,
      button: _CopyButton["default"],
      copiedText: content
    })));
  })));
};

exports.CallInfoList = CallInfoList;
//# sourceMappingURL=CallInfoList.js.map
