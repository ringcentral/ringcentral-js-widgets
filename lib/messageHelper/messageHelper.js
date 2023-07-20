"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directionlessMessageIsUnread = directionlessMessageIsUnread;
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
var _messageTypes = require("../../enums/messageTypes");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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

  // Sometimes the target sender is not the 1st item of `to` filed in the message.
  var targetToField = message.to;
  if (targetToField && targetToField.length > 1) {
    return targetToField.find(function (to) {
      return to.target;
    });
  }
  return targetToField && targetToField[0] || null;
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
  var toRecipients = message.to || [];
  if (message.type === _messageTypes.messageTypes.sms) {
    if (message.direction === 'Outbound') {
      return toRecipients;
    }
    if (toRecipients.length > 1) {
      var toFieldWithoutMyNumber = filterNumbers(toRecipients, myNumber);
      return [].concat(_toConsumableArray(toFieldWithoutMyNumber), _toConsumableArray(fromRecipients));
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
  if (myNumber) {
    return getRecipientNumbersFromMessage({
      message: message,
      myNumber: myNumber
    });
  }
  return [];
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
    });
    // to support send message to myself.
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
    var targetToField = toField.length > 1 ? toField.find(function (to) {
      return to.target;
    }) : toField[0];
    return {
      self: targetToField,
      correspondents: [].concat(_toConsumableArray(fromField), _toConsumableArray(toField.filter(function (it) {
        return it.phoneNumber && (targetToField === null || targetToField === void 0 ? void 0 : targetToField.phoneNumber) && it.phoneNumber !== (targetToField === null || targetToField === void 0 ? void 0 : targetToField.phoneNumber) || (targetToField === null || targetToField === void 0 ? void 0 : targetToField.extensionNumber) && it.extensionNumber && it.extensionNumber !== targetToField.extensionNumber;
      })))
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
    var uri = "".concat(attachment.uri, "?access_token=").concat(decodeURIComponent(accessToken), "&shouldCache=true");
    return _objectSpread(_objectSpread({}, attachment), {}, {
      uri: uri
    });
  });
}
function getConversationId(record) {
  var conversationId = record.conversation && record.conversation.id || record.id;
  return conversationId === null || conversationId === void 0 ? void 0 : conversationId.toString();
}
function sortByCreationTime(a, b) {
  if (a.creationTime === b.creationTime) return 0;
  return a.creationTime && b.creationTime &&
  // make sure creationTime exist
  a.creationTime > b.creationTime ? -1 : 1;
}
function normalizeRecord(record) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var uri = record.uri,
    newRecord = _objectWithoutProperties(record, ["uri"]);
  var conversationId = getConversationId(record);
  delete newRecord.conversation;
  return _objectSpread(_objectSpread({}, newRecord), {}, {
    creationTime: record.creationTime ? new Date(record.creationTime).getTime() : undefined,
    lastModifiedTime: record.lastModifiedTime ? new Date(record.lastModifiedTime).getTime() : undefined,
    conversationId: conversationId
  });
}
function messageIsUnread(message) {
  return message.direction === 'Inbound' && message.readStatus !== 'Read' && !messageIsDeleted(message);
}
function directionlessMessageIsUnread(message) {
  return (message.preUpdateReadStatus || message.readStatus) !== 'Read' && !messageIsDeleted(message);
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
  return [].concat(_toConsumableArray(fax.slice(0, 100)), _toConsumableArray(voice.slice(0, 100)), _toConsumableArray(text.slice(0, 250)));
};
exports.filterMessages = filterMessages;
//# sourceMappingURL=messageHelper.js.map
