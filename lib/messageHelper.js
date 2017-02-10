'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterNumbers = filterNumbers;
exports.messageIsDeleted = messageIsDeleted;
exports.messaageIsTextMessage = messaageIsTextMessage;
exports.messageIsAcceptable = messageIsAcceptable;
exports.getMyNumberFromMessage = getMyNumberFromMessage;
exports.getRecipientNumbersFromMessage = getRecipientNumbersFromMessage;
exports.getRecipients = getRecipients;
function filterNumbers(numbers, filterNumber) {
  return numbers.filter(function (number) {
    if (filterNumber.phoneNumber) {
      return filterNumber.phoneNumber !== number.phoneNumber;
    }
    return filterNumber.extensionNumber !== number.extensionNumber;
  });
}

function messageIsDeleted(message) {
  return message.availability === 'Deleted';
}

function messaageIsTextMessage(message) {
  return message.type !== 'Fax' && message.type !== 'VoiceMail';
}

function messageIsAcceptable(message) {
  return messaageIsTextMessage(message) && !messageIsDeleted(message);
}

function getMyNumberFromMessage(_ref) {
  var message = _ref.message,
      myExtensionNumber = _ref.myExtensionNumber;

  if (!message) {
    return null;
  }
  if (message.direction === 'Outbound') {
    return message.from;
  }
  if (message.type === 'Pager') {
    var myNumber = message.to.find(function (number) {
      return number.extensionNumber === myExtensionNumber;
    });
    if (myNumber) {
      return myNumber;
    }
    return { extensionNumber: myExtensionNumber };
  }
  return message.to[0];
}

function getRecipientNumbersFromMessage(_ref2) {
  var message = _ref2.message,
      myNumber = _ref2.myNumber;

  if (!message) {
    return [];
  }
  if (message.type === 'SMS') {
    if (message.direction === 'Outbound') {
      return message.to;
    }
    return [message.from];
  }
  var allRecipients = [message.from].concat(message.to);
  var recipients = filterNumbers(allRecipients, myNumber);
  if (recipients.length === 0) {
    recipients.push(myNumber);
  }
  return recipients;
}

function getRecipients(_ref3) {
  var message = _ref3.message,
      myExtensionNumber = _ref3.myExtensionNumber;

  var myNumber = getMyNumberFromMessage({
    message: message,
    myExtensionNumber: myExtensionNumber
  });
  return getRecipientNumbersFromMessage({
    message: message,
    myNumber: myNumber
  });
}
//# sourceMappingURL=messageHelper.js.map
