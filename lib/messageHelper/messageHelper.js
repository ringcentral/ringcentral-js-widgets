"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
exports.messageReadStatusMatched = messageReadStatusMatched;
exports.normalizeInstantEvent = normalizeInstantEvent;
exports.normalizeRecord = normalizeRecord;
exports.sortByCreationTime = sortByCreationTime;
exports.sortByDate = sortByDate;
exports.sortSearchResults = sortSearchResults;
exports.uniqueRecipients = uniqueRecipients;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _messageTypes = require("../../enums/messageTypes");
var _excluded = ["id", "conversationId", "type"],
  _excluded2 = ["uri"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      var key = recipient.extensionNumber || recipient.phoneNumber;
      recipientMap[key] = recipient;
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
function normalizeInstantEvent(event) {
  var _ref5 = event.body,
    _ref5$id = _ref5.id,
    id = _ref5$id === void 0 ? '' : _ref5$id,
    _ref5$conversationId = _ref5.conversationId,
    conversationId = _ref5$conversationId === void 0 ? '' : _ref5$conversationId,
    type = _ref5.type,
    message = _objectWithoutProperties(_ref5, _excluded);
  return _objectSpread(_objectSpread({}, message), {}, {
    id: Number(id),
    conversationId: Number(conversationId),
    type: type
  });
}
function normalizeRecord(record) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var uri = record.uri,
    newRecord = _objectWithoutProperties(record, _excluded2);
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
function messageReadStatusMatched(readStatus, message) {
  if (readStatus === 'All') {
    return true;
  } else if (readStatus === 'Unread') {
    return messageIsUnread(message);
  } else {
    return message.readStatus === readStatus;
  }
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
var filterMessages = exports.filterMessages = function filterMessages(messages) {
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
//# sourceMappingURL=messageHelper.js.map
