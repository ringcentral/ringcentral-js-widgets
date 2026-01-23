"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachmentList = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _react = _interopRequireDefault(require("react"));
var _AttachmentItem = require("./AttachmentItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AttachmentList = exports.AttachmentList = function AttachmentList(_ref) {
  var _ref$files = _ref.files,
    files = _ref$files === void 0 ? [] : _ref$files,
    onRemoveAttachment = _ref.onRemoveAttachment;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, files.map(function (file, index) {
    var name = file.name,
      id = file.id;
    return /*#__PURE__*/_react["default"].createElement(_AttachmentItem.AttachmentItem, {
      key: "file-idx-".concat(index, "-").concat(id),
      name: name,
      onActionClick: function onActionClick() {
        return onRemoveAttachment === null || onRemoveAttachment === void 0 ? void 0 : onRemoveAttachment(file);
      }
    });
  }));
};
//# sourceMappingURL=AttachmentList.js.map
