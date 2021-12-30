import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const baseMessageTypes = ObjectMap.fromKeys([
  'syncClosed',
  'syncMinimized',
  'syncSize',
  'syncPosition',
  'pushPresence',
  'pushAdapterState',
  'pushLocale',
  'presenceClicked',
  'presenceItemClicked',
  'clickToDial',
  'clickToSms',
  'pushRingState',
  'pushCalls',
  'pushOnCurrentCallPath',
  'pushOnAllCallsPath',
  'navigateToCurrentCall',
  'navigateToViewCalls',
  'popOut',
]);

export default baseMessageTypes;
