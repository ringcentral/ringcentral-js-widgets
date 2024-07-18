import { RcIcon } from '@ringcentral/juno';
import { Blocked } from '@ringcentral/juno-icon';
import React from 'react';

import { Tooltip } from '../Rcui/Tooltip';

import i18n from './i18n';
import { DoNotCallWrapper } from './styles/DoNotCallIndicator';

type DoNotCallIndicatorProps = {
  currentLocale: string;
};

export const DoNotCallIndicator: React.FC<DoNotCallIndicatorProps> = ({
  currentLocale,
}) => {
  return (
    <Tooltip title={i18n.getString('doNotCall', currentLocale)}>
      <DoNotCallWrapper data-sign="doNotCall">
        <RcIcon color="neutral.f04" symbol={Blocked} size="xsmall" />
      </DoNotCallWrapper>
    </Tooltip>
  );
};
