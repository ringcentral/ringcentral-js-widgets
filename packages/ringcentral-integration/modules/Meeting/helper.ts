import { find } from 'ramda';

import type { ExtensionInfo } from '../ExtensionInfo';

import type { MeetingDelegator, RcMMeetingModel } from './Meeting.interface';

export function getExtensionName({
  extensionInfo,
  enableScheduleOnBehalf,
  meeting,
  delegators,
}: {
  extensionInfo: ExtensionInfo;
  enableScheduleOnBehalf: boolean;
  meeting: RcMMeetingModel;
  delegators: MeetingDelegator[];
}) {
  const extensionName = extensionInfo.info.name || '';
  if (
    !enableScheduleOnBehalf ||
    !meeting ||
    !delegators ||
    delegators.length === 0
  ) {
    return extensionName;
  }
  const currentHost = `${(meeting.host && meeting.host.id) || ''}`;
  const user = find((item) => item.id === currentHost, delegators);
  return user && user.id !== `${extensionInfo.info.id}`
    ? user.name
    : extensionName;
}

export function getHostId({
  enableScheduleOnBehalf,
  meeting,
  extensionInfo,
}: {
  extensionInfo: ExtensionInfo;
  enableScheduleOnBehalf: boolean;
  meeting: RcMMeetingModel;
}) {
  if (enableScheduleOnBehalf && meeting?.host?.id) {
    return `${meeting.host.id}`;
  }
  return `${extensionInfo.info.id}` || '';
}

export const getRcmUriRegExp = (regExpText: string) =>
  new RegExp(
    `(https?):\\/\\/${regExpText}(\\/\\w+)?(\\/(\\d+))(\\?pwd=\\w+)?`,
    'i',
  );

// Regular expression for RingCentral Video meeting URLs, support pmn
// Examples:
// - https://v.ringcentral.com/join/123456789
// - https://v.ringcentral.com/join/asd.f-_g?pw=1234
export const getRcvUriRegExp = (regExpText: string) =>
  new RegExp(
    `(https?):\\/\\/${regExpText}(\\/{1,2}\\w+)*(\\/{1,2}(\\w|\\.)+)(\\?pw=\\w+)?`,
    'i',
  );
