import { RcIcon } from '@ringcentral-integration/rcui';
import checkSvg from '@ringcentral-integration/rcui/icons/icon-check.svg';
import React from 'react';

import { EvActivityCallUIProps } from '../../../interfaces';
import i18n from '../i18n';

export function getButtonText(
  status: EvActivityCallUIProps['saveStatus'],
  currentLocale: string,
) {
  switch (status) {
    case 'saved':
      return <RcIcon symbol={checkSvg} />;
    case 'saving':
      return null;
    case 'submit':
    default:
      return i18n.getString('submit', currentLocale);
  }
}
