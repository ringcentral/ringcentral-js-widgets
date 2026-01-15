"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickPhoneOrExtensionNumber = exports.pickFullPhoneNumber = exports.addNumbersFromCall = exports.addIfNotExist = void 0;
require("core-js/modules/es.array.concat.js");
var RC_EXTENSION_DELIMITER = '*';
var addIfNotExist = exports.addIfNotExist = function addIfNotExist(number, output, numberMap) {
  if (!numberMap[number]) {
    output.push(number);
    numberMap[number] = true;
  }
};

// NOTE:
// business logic for commons for now
// return phone number only.
var pickPhoneNumber = function pickPhoneNumber(phoneNumber) {
  return phoneNumber;
};

// @ts-expect-error TS(2322): Type '(phoneNumber: string, extension: string) => ... Remove this comment to see the full error message
var pickPhoneOrExtensionNumber = exports.pickPhoneOrExtensionNumber = function pickPhoneOrExtensionNumber(phoneNumber, extension) {
  return phoneNumber || extension;
};
var formatExt = function formatExt(num) {
  return "".concat(RC_EXTENSION_DELIMITER).concat(num);
};

// @ts-expect-error TS(2322): Type '(phoneNumber: string, extensionNumber: strin... Remove this comment to see the full error message
var pickFullPhoneNumber = exports.pickFullPhoneNumber = function pickFullPhoneNumber(phoneNumber, extensionNumber) {
  var number = phoneNumber;
  if (phoneNumber && extensionNumber) {
    number = "".concat(phoneNumber).concat(formatExt(extensionNumber));
  } else if (extensionNumber) {
    number = extensionNumber;
  }
  return number;
};
var addNumbersFromCall = exports.addNumbersFromCall = function addNumbersFromCall(output, numberMap) {
  var pickingFullNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (call) {
    var pickNumber = pickingFullNumber ? pickFullPhoneNumber : pickPhoneNumber;
    if (call.from && call.from.phoneNumber) {
      var number = pickNumber(call.from.phoneNumber, call.from.extensionNumber);
      addIfNotExist(number, output, numberMap);
    } else if (call.from && call.from.extensionNumber) {
      addIfNotExist(call.from.extensionNumber, output, numberMap);
    }
    if (call.to && call.to.phoneNumber) {
      var _number = pickNumber(call.to.phoneNumber, call.to.extensionNumber);
      addIfNotExist(_number, output, numberMap);
    } else if (call.to && call.to.extensionNumber) {
      addIfNotExist(call.to.extensionNumber, output, numberMap);
    }
  };
};
//# sourceMappingURL=callHistoryHelper.js.map
