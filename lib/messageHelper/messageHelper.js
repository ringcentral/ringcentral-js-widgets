"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterMessages = void 0;
exports.filterNumbers = filterNumbers;
exports.getConversationId = getConversationId;
exports.getFaxAttachment = getFaxAttachment;
exports.getMMSAttachments = getMMSAttachments;
exports.getMessageType = getMessageType;
exports.getMyNumberFromMessage = getMyNumberFromMessage;
exports.getNumbersFromMessage = getNumbersFromMessage;
exports.getRecipientNumbersFromMessage = getRecipientNumbersFromMessage;
exports.getRecipients = getRecipients;
exports.getVoicemailAttachment = getVoicemailAttachment;
exports.messageIsAcceptable = messageIsAcceptable;
exports.messageIsDeleted = messageIsDeleted;
exports.messageIsFax = messageIsFax;
exports.messageIsTextMessage = messageIsTextMessage;
exports.messageIsUnread = messageIsUnread;
exports.messageIsVoicemail = messageIsVoicemail;
exports.normalizeRecord = normalizeRecord;
exports.sortByCreationTime = sortByCreationTime;
exports.sortByDate = sortByDate;
exports.sortSearchResults = sortSearchResults;
exports.uniqueRecipients = uniqueRecipients;

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

var _messageTypes = require("../../enums/messageTypes");

var _removeUri = _interopRequireDefault(require("../removeUri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function filterNumbers(numbers, filterNumber) {
  return numbers.filter(function (number) {
    if (filterNumber.phoneNumber) {
      return filterNumber.phoneNumber !== number.phoneNumber;
    }

    return filterNumber.extensionNumber !== number.extensionNumber;
  });
}

function messageIsDeleted(message) {
  return message.availability === 'Deleted' || message.availability === 'Purged';
}

function messageIsTextMessage(message) {
  return message.type !== _messageTypes.messageTypes.fax && message.type !== _messageTypes.messageTypes.voiceMail;
}

function messageIsFax(message) {
  return message.type === _messageTypes.messageTypes.fax;
}

function messageIsVoicemail(message) {
  return message.type === _messageTypes.messageTypes.voiceMail;
}

function messageIsAcceptable(message) {
  // do not show submitted faxes or sending failed faxes now
  // do not show deleted messages
  return (message.type !== _messageTypes.messageTypes.fax || message.messageStatus !== 'Queued' && message.messageStatus !== 'SendingFailed') && !messageIsDeleted(message);
}

function getMessageType(message) {
  if (messageIsTextMessage(message)) {
    return _messageTypes.messageTypes.text;
  }

  if (messageIsVoicemail(message)) {
    return _messageTypes.messageTypes.voiceMail;
  }

  if (messageIsFax(message)) {
    return _messageTypes.messageTypes.fax;
  }

  return null;
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

  if (message.type === _messageTypes.messageTypes.pager) {
    var myNumber = message.to.find(function (number) {
      return number.extensionNumber === myExtensionNumber;
    });

    if (myNumber) {
      return myNumber;
    }

    return {
      extensionNumber: myExtensionNumber
    };
  }

  return message.to && message.to.length >= 0 && message.to[0];
}

function uniqueRecipients(recipients) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };
  var recipientMap = {};
  recipients.forEach(function (recipient) {
    if (filter(recipient)) {
      var _key = recipient.extensionNumber || recipient.phoneNumber;

      recipientMap[_key] = recipient;
    }
  });
  return Object.values(recipientMap);
}

function getRecipientNumbersFromMessage(_ref2) {
  var message = _ref2.message,
      myNumber = _ref2.myNumber;

  if (!message) {
    return [];
  }

  var fromRecipients = message.from && [message.from] || [];

  if (message.type === _messageTypes.messageTypes.sms) {
    if (message.direction === 'Outbound') {
      return message.to;
    }

    return fromRecipients;
  }

  var allRecipients = fromRecipients.concat(message.to);
  var recipients = filterNumbers(allRecipients, myNumber);

  if (recipients.length === 0) {
    recipients.push(myNumber);
  }

  return uniqueRecipients(recipients);
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

function getNumbersFromMessage(_ref4) {
  var extensionNumber = _ref4.extensionNumber,
      message = _ref4.message;

  if (!message) {
    return {};
  }

  if (message.type === _messageTypes.messageTypes.pager) {
    // It is safer and simpler to just put all known contacts into array and filter self out
    var contacts = message.to && message.to.slice() || [];
    if (message.from) contacts.push(message.from);
    var correspondents = uniqueRecipients(contacts, function (contact) {
      return contact.extensionNumber !== extensionNumber;
    }); // to support send message to myself.

    if (correspondents && correspondents.length === 0) {
      var myPhoneLength = contacts.filter(function (contact) {
        return contact.extensionNumber === extensionNumber;
      }).length;

      if (myPhoneLength > 0 && contacts.length === myPhoneLength) {
        correspondents.push({
          extensionNumber: extensionNumber
        });
      }
    }

    return {
      self: {
        extensionNumber: extensionNumber
      },
      correspondents: correspondents || []
    };
  }

  var inbound = message.direction === 'Inbound';
  var fromField = message.from && (Array.isArray(message.from) ? message.from : [message.from]) || [];
  var toField = message.to && (Array.isArray(message.to) ? message.to : [message.to]) || [];

  if (inbound) {
    return {
      self: toField[0],
      correspondents: fromField
    };
  }

  return {
    self: fromField[0],
    correspondents: toField
  };
}

function sortByDate(a, b) {
  var ta = new Date(a.creationTime).getTime();
  var tb = new Date(b.creationTime).getTime();
  return tb - ta;
}

function sortSearchResults(a, b) {
  if (a.matchOrder === b.matchOrder) return sortByDate(a, b);
  return a.matchOrder > b.matchOrder ? 1 : -1;
}

function getVoicemailAttachment(message, accessToken) {
  var attachment = message.attachments && message.attachments[0];

  if (!attachment) {
    return {
      duration: 0
    };
  }

  var duration = attachment.vmDuration;
  var uri = "".concat(attachment.uri, "?access_token=").concat(decodeURIComponent(accessToken));
  return {
    duration: duration,
    uri: uri
  };
}

function getFaxAttachment(message, accessToken) {
  var attachment = message.attachments && message.attachments[0];

  if (!attachment) {
    return {};
  }

  var uri = "".concat(attachment.uri, "?access_token=").concat(decodeURIComponent(accessToken));
  return {
    uri: uri
  };
}

function getMMSAttachments(message, accessToken) {
  if (!message.attachments || message.attachments.length === 0) {
    return [];
  }

  var attachments = message.attachments.filter(function (a) {
    return a.type === 'MmsAttachment';
  });
  return attachments.map(function (attachment) {
    var uri = "".concat(attachment.uri, "?access_token=").concat(decodeURIComponent(accessToken));
    return _objectSpread(_objectSpread({}, attachment), {}, {
      uri: uri
    });
  });
}

function getConversationId(record) {
  var conversationId = record.conversation && record.conversation.id || record.id;
  return conversationId.toString();
}

function sortByCreationTime(a, b) {
  if (a.creationTime === b.creationTime) return 0;
  return a.creationTime > b.creationTime ? -1 : 1;
}

function normalizeRecord(record) {
  var newRecord = (0, _removeUri["default"])(record);
  var conversationId = getConversationId(record);
  delete newRecord.conversation;
  return _objectSpread(_objectSpread({}, newRecord), {}, {
    creationTime: new Date(record.creationTime).getTime(),
    lastModifiedTime: new Date(record.lastModifiedTime).getTime(),
    conversationId: conversationId
  });
}

function messageIsUnread(message) {
  return message.direction === 'Inbound' && message.readStatus !== 'Read' && !messageIsDeleted(message);
}
/** salesforce and dynamics slice the message numbers to reduce the pressure of contact match
 * Fax: 100
 * Voice Mail: 100
 * total(SMS, Pager, Text): 250
 * @param {*} records
 */


var filterMessages = function filterMessages(messages) {
  function sortByCreationTime(records) {
    return records.sort(function (a, b) {
      return sortByDate(a, b);
    });
  }

  function groupMessages(records) {
    var faxRecords = records.filter(messageIsFax);
    var voiceMailRecords = records.filter(messageIsVoicemail);
    var textRecords = records.filter(messageIsTextMessage);
    return {
      fax: sortByCreationTime(faxRecords),
      voice: sortByCreationTime(voiceMailRecords),
      text: sortByCreationTime(textRecords)
    };
  }

  var _groupMessages = groupMessages(messages),
      fax = _groupMessages.fax,
      voice = _groupMessages.voice,
      text = _groupMessages.text;

  return [].concat(fax.slice(0, 100), voice.slice(0, 100), text.slice(0, 250));
};

exports.filterMessages = filterMessages;
//# sourceMappingURL=messageHelper.js.map
