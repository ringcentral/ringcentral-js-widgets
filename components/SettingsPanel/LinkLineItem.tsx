import type { FunctionComponent } from 'react';
import React from 'react';

import { LinkLine } from '../LinkLine';

import type { LinkLineItemProps } from './SettingsPanel.interface';
import i18n from './i18n';

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
      // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
      onClick={onClick}
      dataSign={dataSign}
      pendoSignName={pendoSignName}
      {...rest}
    >
      {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not */}
      {customTitle || i18n.getString(name, currentLocale)}
    </LinkLine>
  );
};
