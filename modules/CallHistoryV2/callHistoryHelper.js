"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNumbersFromCall = exports.addIfNotExist = void 0;

var addIfNotExist = function addIfNotExist(number, output, numberMap) {
  if (!numberMap[number]) {
    output.push(number);
    numberMap[number] = true;
  }
};

exports.addIfNotExist = addIfNotExist;

var addNumbersFromCall = function addNumbersFromCall(output, numberMap) {
  return function (call) {
    if (call.from && call.from.phoneNumber) {
      addIfNotExist(call.from.phoneNumber, output, numberMap);
    } else if (call.from && call.from.extensionNumber) {
      addIfNotExist(call.from.extensionNumber, output, numberMap);
    }

    if (call.to && call.to.phoneNumber) {
      addIfNotExist(call.to.phoneNumber, output, numberMap);
    } else if (call.to && call.to.extensionNumber) {
      addIfNotExist(call.to.extensionNumber, output, numberMap);
    }
  };
};

exports.addNumbersFromCall = addNumbersFromCall;
//# sourceMappingURL=callHistoryHelper.js.map
