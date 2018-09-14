'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickFallBackInfo = exports.pickEleByProps = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file tools
 */
var pickEleByProps = exports.pickEleByProps = function pickEleByProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var keys = (0, _keys2.default)(props);
  var result = list.filter(function (item) {
    var shouldPicked = keys.every(function (key) {
      return props[key] === item[key];
    });
    return shouldPicked;
  });
  return result;
};

var pickFallBackInfo = exports.pickFallBackInfo = function pickFallBackInfo() {
  var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var contactMatchMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var currentLocale = arguments[2];
  var direction = call.direction;

  var callFrom = call.from;
  var callTo = call.to;
  var fallBackName = _i18n2.default.getString('Unknown', currentLocale);
  var fallBackNumber = '';

  function getName(target) {
    var name = target.name,
        extensionNumber = target.extensionNumber,
        phoneNumber = target.phoneNumber;

    var number = phoneNumber || extensionNumber;
    var matchList = [];
    if (!name) {
      matchList = contactMatchMap[number] || [];
      if (!matchList.length) {
        return _i18n2.default.getString('Unknown', currentLocale);
      }
      if (matchList.length === 1) {
        return matchList[0].name;
      }
      return _i18n2.default.getString('Multiple', currentLocale);
    }
    return name;
  }

  function getNumber(target) {
    var extensionNumber = target.extensionNumber,
        phoneNumber = target.phoneNumber;

    return phoneNumber || extensionNumber;
  }

  switch (direction) {
    case _callDirections2.default.inbound:
      {
        fallBackName = getName(callFrom);
        fallBackNumber = getNumber(callFrom);
        break;
      }
    case _callDirections2.default.outbound:
      {
        fallBackName = getName(callTo);
        fallBackNumber = getNumber(callTo);
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
//# sourceMappingURL=utils.js.map
