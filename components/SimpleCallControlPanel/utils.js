"use strict";

require("core-js/modules/es.array.every");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickFallBackInfo = exports.pickEleByProps = void 0;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pickEleByProps = function pickEleByProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var keys = Object.keys(props);
  var result = list.filter(function (item) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var shouldPicked = keys.every(function (key) {
      return props[key] === item[key];
    });
    return shouldPicked;
  });
  return result;
};
exports.pickEleByProps = pickEleByProps;
var pickFallBackInfo = function pickFallBackInfo(call, contactName, currentLocale) {
  var direction = call === null || call === void 0 ? void 0 : call.direction;
  var fallBackName = contactName;
  var fallBackNumber = '';
  function getName(target) {
    var activityMatches = target.activityMatches;
    var SINGLE_OR_NONE_MATCH = 2;
    if (!contactName) {
      if (activityMatches && activityMatches.length < SINGLE_OR_NONE_MATCH) {
        return _i18n["default"].getString('Unknown', currentLocale);
      }
      return _i18n["default"].getString('Multiple', currentLocale);
    }
    return contactName;
  }
  function getNumber(numberObj) {
    var extensionNumber = numberObj.extensionNumber,
      phoneNumber = numberObj.phoneNumber;
    return phoneNumber || extensionNumber || numberObj;
  }
  switch (direction) {
    case _callDirections["default"].inbound:
      {
        fallBackName = getName(call);
        fallBackNumber = getNumber(call.from);
        break;
      }
    case _callDirections["default"].outbound:
      {
        fallBackName = getName(call);
        fallBackNumber = getNumber(call.to);
        break;
      }
    default:
      break;
  }
  return {
    fallBackName: fallBackName,
    fallBackNumber: fallBackNumber
  };
};
exports.pickFallBackInfo = pickFallBackInfo;
//# sourceMappingURL=utils.js.map
