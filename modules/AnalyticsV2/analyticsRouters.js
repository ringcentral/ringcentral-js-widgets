"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackRouters = void 0;
var trackRouters = [{
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
  eventPostfix: 'Conference',
  router: '/conference'
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
exports.trackRouters = trackRouters;
//# sourceMappingURL=analyticsRouters.js.map
