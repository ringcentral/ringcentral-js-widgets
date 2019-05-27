"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickFallBackInfo = exports.pickEleByProps = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file tools
 */
var pickEleByProps = function pickEleByProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var keys = Object.keys(props);
  var result = list.filter(function (item) {
    var shouldPicked = keys.every(function (key) {
      return props[key] === item[key];
    });
    return shouldPicked;
  });
  return result;
};

exports.pickEleByProps = pickEleByProps;

var pickFallBackInfo = function pickFallBackInfo() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var contactName = arguments.length > 1 ? arguments[1] : undefined;
  var currentLocale = arguments.length > 2 ? arguments[2] : undefined;
  var direction = call.direction;
  var fallBackName = contactName;
  var fallBackNumber = '';

  function getName(target) {
    var activityMatches = target.activityMatches;
    var SINGLE_OR_NONE_MATCH = 2;

    if (!contactName) {
      if (activityMatches.length < SINGLE_OR_NONE_MATCH) {
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
