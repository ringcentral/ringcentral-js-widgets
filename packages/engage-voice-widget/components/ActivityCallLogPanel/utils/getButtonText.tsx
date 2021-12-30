import React from 'react';

import { RcIcon } from '@ringcentral/juno';
import { Check } from '@ringcentral/juno/icon';

import { EvActivityCallUIProps } from '../../../interfaces';
import i18n from '../i18n';

export function getButtonText(
  status: EvActivityCallUIProps['saveStatus'],
  currentLocale: string,
) {
  switch (status) {
    case 'saved':
      return <RcIcon symbol={Check} />;
    case 'saving':
      return null;
    case 'create':
      return i18n.getString('create', currentLocale);
    // TODO: should check type
    case 'update':
      return i18n.getString('update', currentLocale);
    case 'submit':
    default:
      return i18n.getString('submit', currentLocale);
  }
}
