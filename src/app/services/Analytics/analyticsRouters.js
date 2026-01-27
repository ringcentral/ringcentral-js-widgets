"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackRoutersMap = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var trackRoutersMap = exports.trackRoutersMap = new Map([['/dialer', {
  eventPostfix: 'Dialer',
  router: '/dialer'
}], ['/composeText', {
  eventPostfix: 'Compose SMS',
  router: '/composeText'
}], ['/messages', {
  eventPostfix: 'Messages',
  router: '/messages'
}], ['/fax', {
  eventPostfix: 'Fax',
  router: '/fax'
}], ['/composeFax', {
  eventPostfix: 'Compose Fax',
  router: '/composeFax'
}], ['/conversations', {
  eventPostfix: 'Conversation',
  router: '/conversations'
}], ['/history', {
  eventPostfix: 'Call History',
  router: '/history'
}], ['/calls', {
  eventPostfix: 'All calls page',
  router: '/calls'
}], ['/settings', {
  eventPostfix: 'Settings',
  router: '/settings'
}], ['/meeting', {
  eventPostfix: 'Meeting',
  router: '/meeting'
}], ['/contacts', {
  eventPostfix: 'Contacts',
  router: '/contacts'
}], ['/calls/active', {
  eventPostfix: 'Call Control',
  router: '/calls/active'
}], ['/transfer', {
  eventPostfix: 'Transfer',
  router: '/transfer'
}], ['/simplifycallctrl', {
  eventPostfix: 'Small call control',
  router: '/simplifycallctrl'
}], ['/flip', {
  eventPostfix: 'Flip',
  router: '/flip'
}], ['/conferenceCall', {
  eventPostfix: 'Add',
  router: '/conferenceCall'
}], ['/calling', {
  eventPostfix: 'During calling',
  router: '/calling'
}]]);
//# sourceMappingURL=analyticsRouters.js.map
