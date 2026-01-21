import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Link } from '@ringcentral/spring-ui';
import React from 'react';

import type { EulaProps } from './Eula.interface';
import i18n from './i18n';

export const Eula: React.FC<EulaProps> = ({
  className,
  link = 'https://www.ringcentral.com/legal/eulatos.html',
  onClick,
  label,
  useShortLabel,
  ...rest
}) => {
  const { t } = useLocale(i18n);

  return (
    <Link
      color="text-primary-b"
      className={className}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      onClick={(e) => onClick?.(e, link)}
      {...rest}
    >
      {label ?? t(useShortLabel ? 'eulaAbbr' : 'eula')}
    </Link>
  );
};
