import React from 'react';

import { RcLink } from '@ringcentral/juno';

import { EulaProps } from './Eula.interface';
import i18n from './i18n';

export const Eula: React.FC<EulaProps> = ({
  currentLocale,
  className,
  link = 'https://www.ringcentral.com/legal/eulatos.html',
  dataSign,
  onClick,
  label,
  useShortLabel,
}) => {
  const onClickHandler = React.useMemo<React.MouseEventHandler>(
    () => (onClick ? (e) => onClick(e, link) : null),
    [onClick, link],
  );
  return (
    <RcLink
      color="content.brand"
      variant="inherit"
      className={className}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      onClick={onClickHandler}
      data-sign={dataSign}
    >
      {label ??
        i18n.getString(useShortLabel ? 'eulaAbbr' : 'eula', currentLocale)}
    </RcLink>
  );
};
