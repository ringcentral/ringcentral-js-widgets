import { createHashMap } from '../lib/HashMap';

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
const extensionTypes = createHashMap({
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
  voicemail: 'Voicemail',
});

export default extensionTypes;
