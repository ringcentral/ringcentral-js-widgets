'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HashMap = require('../lib/HashMap');

var _HashMap2 = _interopRequireDefault(_HashMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var extensionTypes = new _HashMap2.default({
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

exports.default = extensionTypes;
//# sourceMappingURL=extensionTypes.js.map
