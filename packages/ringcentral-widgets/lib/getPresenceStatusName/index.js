import DndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import i18n from './i18n';

export function getPresenceStatusName(
  presenceStatus,
  dndStatus,
  currentLocale,
) {
  if (dndStatus === DndStatus.doNotAcceptAnyCalls) {
    return i18n.getString(dndStatus, currentLocale);
  }
  return i18n.getString(presenceStatus, currentLocale);
}
