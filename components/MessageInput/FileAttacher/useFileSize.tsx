import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useMemo } from 'react';

import i18n from './i18n';

const numberFormatOptions = {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
};

// refer from J: project/common/ui/common/src/helper/helper.ts
export const useFileSize = (bytes?: number) => {
  const { t } = useLocale(i18n);

  return useMemo(() => {
    if (!bytes || bytes < 0) {
      return null;
    }

    if (typeof bytes !== 'number' || bytes === 0) {
      return `0 ${t('B')}`;
    }

    if (bytes < 100) {
      const formatNumber = i18n.formatNumber(bytes, numberFormatOptions);
      return `${formatNumber} ${t('B')}`;
    }
    if (bytes / 1024 < 1000) {
      const formatNumber = i18n.formatNumber(bytes / 1024, numberFormatOptions);
      return `${formatNumber} ${t('KB')}`;
    }
    if (bytes / 1024 / 1024 < 1000) {
      const formatNumber = i18n.formatNumber(
        bytes / 1024 / 1024,
        numberFormatOptions,
      );
      return `${formatNumber} ${t('MB')}`;
    }
    const formatNumber = i18n.formatNumber(
      bytes / 1024 / 1024 / 1024,
      numberFormatOptions,
    );
    return `${formatNumber} ${t('GB')}`;
  }, [bytes, t]);
};
