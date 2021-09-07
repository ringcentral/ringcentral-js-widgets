import React, { FunctionComponent } from 'react';

import LinkLine from '../../LinkLine';
import i18n from '../i18n';
import { onLinkLineItemClick } from '../SettingsPanel.interface';

export interface LinkLineItemProps extends onLinkLineItemClick {
  name?: string;
  customTitle?: string;
  currentLocale: string;
  show?: boolean;
  pendoSignName?: string;
}

export const LinkLineItem: FunctionComponent<LinkLineItemProps> = ({
  show,
  name,
  customTitle,
  currentLocale,
  onClick,
  pendoSignName,
  ...rest
}) => {
  if (!show) {
    return null;
  }
  return (
    <LinkLine
      hideUnderline
      onClick={onClick}
      pendoSignName={pendoSignName}
      {...rest}
    >
      {customTitle || i18n.getString(name, currentLocale)}
    </LinkLine>
  );
};
