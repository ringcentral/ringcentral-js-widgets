"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoList = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CopyButton = _interopRequireDefault(require("../../CopyButton/CopyButton"));
var _CopyToClipboard = _interopRequireDefault(require("../../CopyToClipboard"));
var _CallInfo = require("../CallInfo");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallInfoList = exports.CallInfoList = function CallInfoList(_ref) {
  var callInfos = _ref.callInfos,
    className = _ref.className,
    onCopySuccess = _ref.onCopySuccess,
    currentLocale = _ref.currentLocale;
  if (!callInfos || callInfos.length === 0) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "infoList",
    className: className
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, callInfos.map(function (_ref2, i) {
    var attr = _ref2.attr,
      name = _ref2.name,
      content = _ref2.content,
      enableCopy = _ref2.enableCopy;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
      key: i,
      className: (0, _clsx["default"])(_styles["default"].listItem),
      button: false
    }, /*#__PURE__*/_react["default"].createElement(_CallInfo.CallInfo, {
      name: name,
      content: content
    }), enableCopy && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].copyBtn
    }, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"]
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    , {
      handleSuccess: function handleSuccess() {
        return onCopySuccess(attr);
      }
      // @ts-expect-error TS(2769): No overload matches this call.
      ,
      currentLocale: currentLocale,
      button: _CopyButton["default"],
      copiedText: content
    })));
  })));
};
//# sourceMappingURL=CallInfoList.js.map
