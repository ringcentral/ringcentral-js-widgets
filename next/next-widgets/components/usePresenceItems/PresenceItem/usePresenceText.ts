import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useMemo } from 'react';

import i18n from './i18n';

export function usePresenceText({
  dndStatus,
  presenceStatus,
}: {
  dndStatus: string | undefined;
  presenceStatus: string | undefined;
}) {
  const { t } = useLocale(i18n);

  const title = useMemo(() => {
    if (dndStatus === 'DoNotAcceptAnyCalls') {
      return t(dndStatus);
    }

    return t((presenceStatus as any) || 'Available');
  }, [dndStatus, t, presenceStatus]);
  return title;
}
