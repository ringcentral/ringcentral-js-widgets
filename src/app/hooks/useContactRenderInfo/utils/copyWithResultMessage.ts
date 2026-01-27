import writeText from 'copy-to-clipboard';

import { t } from '../i18n';

export const copyWithResultMessage = (phoneNumber: string) => {
  if (phoneNumber && writeText(phoneNumber)) {
    return t('copyNumberSuccess');
  }

  return false;
};
