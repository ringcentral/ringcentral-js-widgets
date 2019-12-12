import React, { FunctionComponent } from 'react';

import LinkLine from '../../LinkLine';
import i18n from '../i18n';
import { onLinkLineItemClick } from '../SettingsPanel.interface';

export interface LinkLineItemProps extends onLinkLineItemClick {
  name?: string;
  customTitle?: string;
  currentLocale: string;
  show?: boolean;
}

export const LinkLineItem: FunctionComponent<LinkLineItemProps> = ({
  show,
  name,
  customTitle,
  currentLocale,
  onClick,
}) => {
  if (!show) {
    return null;
  }
  return (
    <LinkLine onClick={onClick}>
      {customTitle || i18n.getString(name, currentLocale)}
    </LinkLine>
  );
};
