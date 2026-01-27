"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormattedDateFromNow = useFormattedDateFromNow;
exports.useFormattedDateFromNowFn = useFormattedDateFromNowFn;
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _react = require("react");
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function useFormattedDateFromNow(dateTime) {
  var timePresentationMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'withTime';
  var formattedDateFromNow = useFormattedDateFromNowFn();
  return (0, _react.useMemo)(function () {
    return formattedDateFromNow(dateTime, timePresentationMode);
  }, [formattedDateFromNow, dateTime, timePresentationMode]);
}
function useFormattedDateFromNowFn() {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return function (dateTime) {
    var timePresentationMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'withTime';
    return (0, _formatDuration.formatDateFromNow)(dateTime, {
      yesterday: t('yesterday'),
      timePresentationMode: timePresentationMode
    });
  };
}
//# sourceMappingURL=useFormattedDateFromNow.js.map
