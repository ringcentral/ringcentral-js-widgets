"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileAttachmentRender = void 0;
require("core-js/modules/es.array.concat.js");
var _constant = require("@ringcentral-integration/utils/src/utils/fileHandler/constant");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _fileHandler = require("../../../utils/src/utils/fileHandler/fileHandler");
var _DownloadButton = require("../DownloadButton");
var _getFileSize = require("../MessageInput/FileAttacher/utils/getFileSize");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var FileAttachmentRender = exports.FileAttachmentRender = function FileAttachmentRender(_ref) {
  var attachment = _ref.attachment,
    onLinkClick = _ref.onLinkClick;
  var fileName = attachment.fileName ? (0, _fileHandler.removeExtension)(attachment.fileName) : attachment.id;
  var fileExt = attachment.fileName ? (0, _fileHandler.getFileExtension)(attachment.fileName) : _constant.CONTENT_TYPE_TO_EXTENSION[attachment.contentType];
  var fileSize = (0, _getFileSize.getFileSize)(attachment.size);
  var downloadUrl = "".concat(attachment.uri, "&contentDisposition=Attachment");
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: attachment.id,
    className: "flex items-center w-full space-x-2"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "large",
    symbol: _junoIcon.FileBorder
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center text-neutral-b1 typography-mainText overflow-hidden",
    "data-sign": "file-full-name"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "truncate"
  }, fileName), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex-none', _styles["default"].ext)
  }, ".", fileExt)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-neutral-b2 text-sm"
  }, fileSize)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DownloadButton.DownloadButton, {
    size: "large",
    url: downloadUrl,
    name: "".concat(fileName, ".").concat(fileExt),
    onClick: onLinkClick
  })));
};
//# sourceMappingURL=FileAttachmentRender.js.map
