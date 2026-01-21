import type { ContactPresence } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { StatusIndicatorProps } from '@ringcentral/spring-ui';

export function mapToSpringUIPresence(
  presence: ContactPresence,
): StatusIndicatorProps['variant'] {
  const { dndStatus, presenceStatus, telephonyStatus, meetingStatus } =
    presence;

  if (dndStatus === 'DoNotAcceptAnyCalls') {
    return 'dnd';
  }

  if (presenceStatus === 'Offline') {
    return 'unavailable';
  }

  if (
    presenceStatus === 'Busy' ||
    (telephonyStatus && telephonyStatus !== 'NoCall') ||
    meetingStatus === 'Connected'
  ) {
    return 'busy';
  }

  if (presenceStatus === 'Available') {
    return 'available';
  }

  return 'unavailable';
}
