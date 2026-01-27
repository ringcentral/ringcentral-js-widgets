import type { TrackRouter } from './Analytics.interface';

export const trackRoutersMap = new Map<string, TrackRouter>([
  ['/dialer', { eventPostfix: 'Dialer', router: '/dialer' }],
  ['/composeText', { eventPostfix: 'Compose SMS', router: '/composeText' }],
  ['/messages', { eventPostfix: 'Messages', router: '/messages' }],
  ['/fax', { eventPostfix: 'Fax', router: '/fax' }],
  ['/composeFax', { eventPostfix: 'Compose Fax', router: '/composeFax' }],
  [
    '/conversations',
    { eventPostfix: 'Conversation', router: '/conversations' },
  ],
  ['/history', { eventPostfix: 'Call History', router: '/history' }],
  ['/calls', { eventPostfix: 'All calls page', router: '/calls' }],
  ['/settings', { eventPostfix: 'Settings', router: '/settings' }],
  ['/meeting', { eventPostfix: 'Meeting', router: '/meeting' }],
  ['/contacts', { eventPostfix: 'Contacts', router: '/contacts' }],
  ['/calls/active', { eventPostfix: 'Call Control', router: '/calls/active' }],
  ['/transfer', { eventPostfix: 'Transfer', router: '/transfer' }],
  [
    '/simplifycallctrl',
    { eventPostfix: 'Small call control', router: '/simplifycallctrl' },
  ],
  ['/flip', { eventPostfix: 'Flip', router: '/flip' }],
  ['/conferenceCall', { eventPostfix: 'Add', router: '/conferenceCall' }],
  ['/calling', { eventPostfix: 'During calling', router: '/calling' }],
]);
