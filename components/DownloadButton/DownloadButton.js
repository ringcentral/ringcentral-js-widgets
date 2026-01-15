"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadButton = void 0;
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DownloadButton = function DownloadButton(_ref) {
  var url = _ref.url,
    name = _ref.name,
    _onClick = _ref.onClick,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    title: (0, _i18n.t)('download'),
    size: size,
    color: "neutral.f07",
    variant: "plain",
    "data-sign": "download",
    symbol: _junoIcon.Download,
    onClick: function onClick(e) {
      if (_onClick) return _onClick(url);
      e.preventDefault();
      e.stopPropagation();
      if (!url) return;
      (0, _utils.downloadFileWithIframe)(url, name);
    }
  });
};
exports.DownloadButton = DownloadButton;
//# sourceMappingURL=DownloadButton.js.map
