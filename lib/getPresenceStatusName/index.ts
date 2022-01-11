import dndStatus from '@ringcentral-integration/commons/modules/Presence/dndStatus';

import i18n from './i18n';

export function getPresenceStatusName(
  currentUserStatus: string,
  currentDndStatus: string,
  currentLocale: string,
) {
  if (currentDndStatus === dndStatus.doNotAcceptAnyCalls) {
    return i18n.getString(currentDndStatus, currentLocale);
  }
  return i18n.getString(currentUserStatus, currentLocale);
}
