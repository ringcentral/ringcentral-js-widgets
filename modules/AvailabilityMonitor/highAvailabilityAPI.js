"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HashMap = _interopRequireDefault(require("../../lib/HashMap"));

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: Store as JSON, and can be requested from backend server
var _default = new _HashMap.default({
  '/restapi/v1.0/account': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/validate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/active-calls': {
    GET: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/answering-rule': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/answering-rule/{ruleId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/application-extensions': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/application-extensions/~': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/assigned-role': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/bots': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/bots/~': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/business-address': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/business-hours': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-log': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-log-sync': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-log/{callRecordId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-monitoring-groups': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-monitoring-groups/{groupId}': {
    DELETE: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-monitoring-groups/{groupId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-monitoring-groups/{groupId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-queues': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-queues/{groupId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-queues/{groupId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-recording': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-recording/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-recording/custom-greetings': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/call-recording/custom-greetings/{greetingId}': {
    DELETE: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/call-recording/extensions': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/department/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/department/{departmentId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/device': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/device/{deviceId}': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/device/{deviceId}/assign-line': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/device/{deviceId}/sip-info': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/dialing-plan': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/free-numbers': {
    GET: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/validate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/active-calls': {
    GET: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/address-book': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/address-book-sync': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/address-book/contact': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/address-book/contact/{contactId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/address-book/group': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/address-book/group/{groupId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/address-book/group/{groupId}/contact': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/address-book/group/{groupId}/contact/{contactIds}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/administered-sites': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/answering-rule': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/answering-rule/{ruleId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/assigned-role': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/authz-profile': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/authz-profile/check': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/blocked-number': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/blocked-number/{blockedNumberId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/business-hours': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/call-log': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/call-log-sync': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/call-log/{callRecordId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/caller-blocking': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/caller-blocking/phone-numbers': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/caller-blocking/phone-numbers/{blockedNumberId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/caller-id': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/company-pager': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/company-pager/{messageId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/company-pager/{messageId}/content/{attachmentId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/conferencing': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/credentials': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/credentials/validate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/credentials/verify': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/delegates': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/delegation-assignments': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/device': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/direct-ring-out': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/email-to-fax': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/favorite': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/fax': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/fax/{faxIds}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/fax/{faxId}/content/{attachmentId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/forwarding-number': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/forwarding-number/{forwardingNumberId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/grant': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/greeting': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/greeting-recording-call': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/greeting-recording-call/{callId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/greeting/{greetingId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/incoming-call-info': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/intercom': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/intercom/permissions': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/meeting': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/meeting/service-info': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/meeting/{meetingId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/meeting/{meetingId}/end': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/meetings-configuration': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/message-store': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/message-store/counters': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/message-store/{messageId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/message-store/{messageId}/content/{attachmentId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/message-sync': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/notification-settings': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/permissions': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/phone-number': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/presence/line': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/presence/line/{lineId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/presence/permission': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/profile-image': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/profile-image/{scaleSize}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/reporting/settings': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/ring-out': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/ring-out/{ringoutId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/ringout': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/ringout/direct': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/ringout/{ringoutId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/sms': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/sms/{messageIds}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/sms/{messageId}/content/{attachmentId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/extension/~/user-groups': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/extension/~/validate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/glip-configuration': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/greeting': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/greeting/{greetingId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/ivr': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/ivr-menus': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/ivr-menus/{ivrMenuId}': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/ivr-prompts': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/ivr-prompts/{promptId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/ivr-prompts/{promptId}/content': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/licenses': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/licenses/bulk-purchase': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/licenses/{licenseId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/live-reporting/dashboards': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/live-reporting/dashboards/{dashboardId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/meetings-configuration': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/order': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/order/{orderId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/paging-only-groups/{pagingOnlyGroupId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/paging-only-groups/{pagingOnlyGroupId}/devices': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/paging-only-groups/{pagingOnlyGroupId}/users': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/park-locations/{parkLocationId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/park-locations/{parkLocationId}/users': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/payment-info': {
    GET: _availabilityStatus.default.LIMITED,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/phone-number': {
    GET: _availabilityStatus.default.LIMITED,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/phone-number/{phoneNumberId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/recording/{recordingId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/recording/{recordingId}/content': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/service-info': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/shared-lines-groups/{groupId}/lines': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/sites': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/sites/{siteId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/sites/{siteId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/sites/{siteId}/ivr': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/sites/{siteId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/templates': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/templates/{templateId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/templates/{templateId}/bulk-apply': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-group': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-group/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-group/{groupId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-group/{groupId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/user-role': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-role/default': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-role/{roleId}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/user-role/{roleId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/account/~/validate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/voicemail-library': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/voicemail-library/broadcasts/{taskId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/voicemail-library/{libraryItemId}': {
    DELETE: _availabilityStatus.default.HIGH,
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/voicemail-library/{libraryItemId}/content': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/account/~/voicemail-library/{libraryItemId}/send': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/client-info': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/client-info/banners': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/client-info/banners/settings': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/client-info/custom-data/{key}': {
    DELETE: _availabilityStatus.default.LIMITED,
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/client-info/custom-data/{key}/content': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/client-info/sip-provision': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/client-info/special-number-rule': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/brand/{brandId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/country': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/country/{countryId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/device': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/fax-cover-page': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/forms/address': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/greeting': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/greeting/{greetingId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/language': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/language/{languageId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/license-types': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/location': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/permission': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/permission-category': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/permission-category/{permissionCategoryId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/permission/{permissionId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/secret-question': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/secret-question/{questionId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/service-plan/{servicePlanId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/shipping-options': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/state': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/state/{stateId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/timezone': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/timezone/{timezoneId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/user-role': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/dictionary/user-role/{roleId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/integration-profiles': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/account/info': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/account/~/call-monitoring-groups': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/account/~/call-monitoring-groups/{groupId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/account/~/call-monitoring-groups/{groupId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/account/~/call-queues': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/account/~/call-queues/{groupId}/bulk-assign': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/account/~/call-queues/{groupId}/members': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/address-book': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/account/large-accounts': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/account/~/': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/account/~/business-info': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/account/~/get-all-by-account-id': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/account/~/get-all-by-account-id-lists': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/extension/': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/extension/bulk': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/extension/~': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/federation/': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/phone-number/': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/phone-number/bulk': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/phone-number/bulk-by-extension-ids': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/adg/phone-number/{phoneNumberId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/billing-events/process-event': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/call-recording/account/~/recording/{callRecordingId}/stream': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/delegates': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/device-order/update': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/email-to-fax/send': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/extension-permissions/check': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/favorite': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/legal-data': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/live-reporting/dashboards/permissions': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/message-content-stream/account/~/extension/~/message-store/{messageId}/content/{attachmentId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/order-processor/process-device-order': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/presence': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/presence-line': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/presence-permissions': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/profile-image/account/~/extension/~/stream': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/profile-image/account/~/extension/~/stream/{scaleSize}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/promotion-code': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/send-confirmation-email': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/send-sms': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/service-parameter/{parameterId}': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/subscription/legacy/apn/add': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/subscription/legacy/apn/remove': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/tap-settings': {
    GET: _availabilityStatus.default.HIGH,
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/tester-flag': {
    PUT: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/internal/token-validation': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/account-info-partner/{partnerId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/account-info/~': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/authenticate': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/authentication': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/brand-info/{brandId}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/contact-email-lookup': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/extension-info/~': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/iovation-device': {
    GET: _availabilityStatus.default.HIGH,
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/login-hash/{loginHash}': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/login-info': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/multifactor/send-code': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/internal/user-auth/session-created': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/notify-admin': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/number-parser/parse': {
    POST: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/number-parser/phonedata.xml': {
    GET: _availabilityStatus.default.HIGH
  },
  '/restapi/v1.0/number-pool/lookup': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/number-pool/lookup-external': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/number-pool/reserve': {
    POST: _availabilityStatus.default.LIMITED
  },
  '/restapi/v1.0/status': {
    GET: _availabilityStatus.default.LIMITED
  },
  '/restapi/{apiVersion}': {
    GET: _availabilityStatus.default.HIGH
  }
});

exports.default = _default;
//# sourceMappingURL=highAvailabilityAPI.js.map
