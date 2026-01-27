"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoneNumber = exports.getIconInfo = exports.getDetail = void 0;
exports.messageIsFax = messageIsFax;
exports.messageIsTextMessage = messageIsTextMessage;
exports.messageIsVoicemail = messageIsVoicemail;
require("core-js/modules/es.array.concat.js");
var _messageDirection = require("@ringcentral-integration/commons/enums/messageDirection");
var _messageTypes = require("@ringcentral-integration/commons/enums/messageTypes");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _springIcon = require("@ringcentral/spring-icon");
var _i18n = require("./i18n");
var getIconInfo = exports.getIconInfo = function getIconInfo(conversation) {
  switch (conversation.type) {
    case _messageTypes.messageTypes.voiceMail:
      return {
        icon: _springIcon.VoicemailMd
      };
    case _messageTypes.messageTypes.fax:
      return {
        icon: _springIcon.FaxMd
      };
    default:
      return {
        icon: _springIcon.Smsmd
      };
  }
};

// ringcentral-js-widgets/ringcentral-widgets/components/MessageItem/index.tsx
// getDetail
var getDetail = exports.getDetail = function getDetail(conversation) {
  if (messageIsTextMessage(conversation)) {
    if (conversation.mmsAttachments && conversation.mmsAttachments.length > 0) {
      var count = conversation.mmsAttachments.length;
      if (count === 1) {
        return (0, _i18n.t)('mmsWithOneAttachment');
      }
      return (0, _i18n.t)('mmsWithAttachments', {
        count: count
      });
    }
    return conversation.subject;
  }
  if (conversation.voicemailAttachment) {
    var duration = conversation.voicemailAttachment.duration;
    return "".concat((0, _formatDuration.formatDurationWithLocale)(duration, {
      day: (0, _i18n.t)('day'),
      hr: (0, _i18n.t)('hour'),
      min: (0, _i18n.t)('min'),
      sec: (0, _i18n.t)('sec')
    }));
  }
  if (messageIsFax(conversation)) {
    var pageCount = (conversation === null || conversation === void 0 ? void 0 : conversation.faxPageCount) || 0;
    var pageUnit = (0, _i18n.t)(pageCount === 1 ? 'page' : 'pages');
    var pageSuffix = ": ".concat(pageCount, " ").concat(pageUnit);
    if (conversation.direction === _messageDirection.messageDirection.inbound) {
      return "".concat((0, _i18n.t)('faxReceived')).concat(pageSuffix);
    }
    var messageStatus = conversation.messageStatus;
    switch (messageStatus) {
      case 'SendingFailed':
      case 'DeliveryFailed':
        return (0, _i18n.t)('faxSendFailed');
      case 'Queued':
        return pageCount === 0 ? (0, _i18n.t)('faxProcessing') : "".concat((0, _i18n.t)('faxSubmitted')).concat(pageSuffix);
      default:
        break;
    }
    return "".concat((0, _i18n.t)('faxSent')).concat(pageSuffix);
  }
  return '';
};

// ringcentral-js-widgets/ringcentral-widgets/components/MessageItem/index.tsx
// getPhoneNumber
var getPhoneNumber = exports.getPhoneNumber = function getPhoneNumber(conversation) {
  var correspondents = conversation.correspondents;
  return (
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    correspondents.length === 1 &&
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    correspondents[0] && (
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined
  );
};

// ringcentral-js-widgets/ringcentral-integration/lib/messageHelper/messageHelper.ts
function messageIsTextMessage(message) {
  return message.type !== _messageTypes.messageTypes.fax && message.type !== _messageTypes.messageTypes.voiceMail;
}
function messageIsFax(message) {
  return message.type === _messageTypes.messageTypes.fax;
}
function messageIsVoicemail(message) {
  return message.type === _messageTypes.messageTypes.voiceMail;
}
//# sourceMappingURL=helpers.js.map
