import { find } from 'ramda';

import { ExtensionInfo } from '../ExtensionInfoV2';
import { MeetingDelegator, RcMMeetingModel } from './Meeting.interface';

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

export const getRcvUriRegExp = (regExpText: string) =>
  new RegExp(
    `(https?):\\/\\/${regExpText}(\\/{1,2}\\w+)*(\\/{1,2}(\\d+))(\\?pw=\\w{32})?`,
    'i',
  );
