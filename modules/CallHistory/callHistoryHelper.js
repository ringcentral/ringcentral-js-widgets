"use strict";

require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickPhoneOrExtensionNumber = exports.pickFullPhoneNumber = exports.addNumbersFromCall = exports.addIfNotExist = void 0;
var RC_EXTENSION_DELIMITER = '*';
var addIfNotExist = function addIfNotExist(number, output, numberMap) {
  if (!numberMap[number]) {
    output.push(number);
    numberMap[number] = true;
  }
};

// NOTE:
// business logic for commons for now
// return phone number only.
exports.addIfNotExist = addIfNotExist;
var pickPhoneNumber = function pickPhoneNumber(phoneNumber) {
  return phoneNumber;
};

// @ts-expect-error
var pickPhoneOrExtensionNumber = function pickPhoneOrExtensionNumber(phoneNumber, extension) {
  return phoneNumber || extension;
};
exports.pickPhoneOrExtensionNumber = pickPhoneOrExtensionNumber;
var formatExt = function formatExt(num) {
  return "".concat(RC_EXTENSION_DELIMITER).concat(num);
};

// @ts-expect-error
var pickFullPhoneNumber = function pickFullPhoneNumber(phoneNumber, extensionNumber) {
  var number = phoneNumber;
  if (phoneNumber && extensionNumber) {
    number = "".concat(phoneNumber).concat(formatExt(extensionNumber));
  } else if (extensionNumber) {
    number = extensionNumber;
  }
  return number;
};
exports.pickFullPhoneNumber = pickFullPhoneNumber;
var addNumbersFromCall = function addNumbersFromCall(output, numberMap) {
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
exports.addNumbersFromCall = addNumbersFromCall;
//# sourceMappingURL=callHistoryHelper.js.map
