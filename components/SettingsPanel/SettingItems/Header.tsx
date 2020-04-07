import React, { FunctionComponent } from 'react';

import { Header as BaseHeader } from '../../Header';
import i18n from '../i18n';

export interface HeaderProps {
  currentLocale: string;
  showHeader?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({
  showHeader,
  currentLocale,
}) => {
  if (!showHeader) {
    return null;
  }
  return <BaseHeader>{i18n.getString('settings', currentLocale)}</BaseHeader>;
};
