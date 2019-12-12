"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

/**
 * @typedef ExtensionTypes
 * @type {object}
 * @property {string} announcement
 * @property {string} applicationExtension
 * @property {string} bot
 * @property {string} department
 * @property {string} digitalUser
 * @property {string} faxUser
 * @property {string} ivrMenu
 * @property {string} limited
 * @property {string} pagingOnly
 * @property {string} parkLocation
 * @property {string} sharedLinesGroup
 * @property {string} user
 * @property {string} virtualUser
 * @property {string} voicemail
 */

/**
 * @type {ExtensionTypes}
 */
var extensionTypes = (0, _HashMap.createHashMap)({
  announcement: 'Announcement',
  applicationExtension: 'ApplicationExtension',
  bot: 'Bot',
  department: 'Department',
  digitalUser: 'DigitalUser',
  faxUser: 'FaxUser',
  ivrMenu: 'IvrMenu',
  limited: 'Limited',
  pagingOnly: 'PagingOnly',
  parkLocation: 'ParkLocation',
  sharedLinesGroup: 'SharedLinesGroup',
  user: 'User',
  virtualUser: 'VirtualUser',
  voicemail: 'Voicemail'
});
var _default = extensionTypes;
exports["default"] = _default;
//# sourceMappingURL=extensionTypes.js.map
