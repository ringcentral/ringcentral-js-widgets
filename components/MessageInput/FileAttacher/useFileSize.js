"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFileSize = void 0;
require("core-js/modules/es.array.concat.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _react = require("react");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var numberFormatOptions = {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
};

// refer from J: project/common/ui/common/src/helper/helper.ts
var useFileSize = exports.useFileSize = function useFileSize(bytes) {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return (0, _react.useMemo)(function () {
    if (!bytes || bytes < 0) {
      return null;
    }
    if (typeof bytes !== 'number' || bytes === 0) {
      return "0 ".concat(t('B'));
    }
    if (bytes < 100) {
      var _formatNumber = _i18n["default"].formatNumber(bytes, numberFormatOptions);
      return "".concat(_formatNumber, " ").concat(t('B'));
    }
    if (bytes / 1024 < 1000) {
      var _formatNumber2 = _i18n["default"].formatNumber(bytes / 1024, numberFormatOptions);
      return "".concat(_formatNumber2, " ").concat(t('KB'));
    }
    if (bytes / 1024 / 1024 < 1000) {
      var _formatNumber3 = _i18n["default"].formatNumber(bytes / 1024 / 1024, numberFormatOptions);
      return "".concat(_formatNumber3, " ").concat(t('MB'));
    }
    var formatNumber = _i18n["default"].formatNumber(bytes / 1024 / 1024 / 1024, numberFormatOptions);
    return "".concat(formatNumber, " ").concat(t('GB'));
  }, [bytes, t]);
};
//# sourceMappingURL=useFileSize.js.map
