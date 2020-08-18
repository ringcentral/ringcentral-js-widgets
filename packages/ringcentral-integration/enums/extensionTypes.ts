import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const extensionTypes = ObjectMap.fromObject({
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
  room: 'Room',
  sharedLinesGroup: 'SharedLinesGroup',
  site: 'Site',
  user: 'User',
  virtualUser: 'VirtualUser',
  voicemail: 'Voicemail',
} as const);

export default extensionTypes;
