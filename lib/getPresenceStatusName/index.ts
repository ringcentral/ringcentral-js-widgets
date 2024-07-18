import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';

import i18n, { type I18nKey } from './i18n';

export function getPresenceStatusName(
  currentUserStatus: I18nKey,
  currentDndStatus: I18nKey,
  currentLocale: string,
) {
  if (currentDndStatus === dndStatus.doNotAcceptAnyCalls) {
    return i18n.getString(currentDndStatus, currentLocale);
  }
  return i18n.getString(currentUserStatus, currentLocale);
}
