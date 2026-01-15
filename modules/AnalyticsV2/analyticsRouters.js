"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackRouters = void 0;
var trackRouters = exports.trackRouters = [{
  eventPostfix: 'Dialer',
  router: '/dialer'
}, {
  eventPostfix: 'Compose SMS',
  router: '/composeText'
}, {
  eventPostfix: 'Messages',
  router: '/messages'
}, {
  eventPostfix: 'Conversation',
  router: '/conversations'
}, {
  eventPostfix: 'Call History',
  router: '/history'
}, {
  eventPostfix: 'All calls page',
  router: '/calls'
}, {
  eventPostfix: 'Settings',
  router: '/settings'
}, {
  eventPostfix: 'Meeting',
  router: '/meeting'
}, {
  eventPostfix: 'Contacts',
  router: '/contacts'
}, {
  eventPostfix: 'Call Control',
  router: '/calls/active'
}, {
  eventPostfix: 'Transfer',
  router: '/transfer'
}, {
  eventPostfix: 'Small call control',
  router: '/simplifycallctrl'
}, {
  eventPostfix: 'Flip',
  router: '/flip'
}, {
  eventPostfix: 'Add',
  router: '/conferenceCall'
}];
//# sourceMappingURL=analyticsRouters.js.map
