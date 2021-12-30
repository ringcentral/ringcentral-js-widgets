import React, { FunctionComponent } from 'react';

import { LinkLine } from '../LinkLine';
import i18n from './i18n';
import { LinkLineItemProps } from './SettingsPanel.interface';

export const LinkLineItem: FunctionComponent<LinkLineItemProps> = ({
  show,
  name,
  customTitle,
  currentLocale,
  onClick,
  dataSign,
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
      dataSign={dataSign}
      pendoSignName={pendoSignName}
      {...rest}
    >
      {customTitle || i18n.getString(name, currentLocale)}
    </LinkLine>
  );
};
