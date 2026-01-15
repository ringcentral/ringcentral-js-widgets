import { RcBox, RcIcon, RcTooltip, RcTypography } from '@ringcentral/juno';
import { LockBorder } from '@ringcentral/juno-icon';
import React from 'react';

import { t } from './i18n';
import styles from './styles.scss';

interface AdaptiveTypographyProps {
  isLock?: boolean;
  title: string;
}

export const AdaptiveTypography: React.FC<AdaptiveTypographyProps> = ({
  isLock = false,
  title,
}) => {
  return (
    <RcTypography
      component="div"
      variant={isLock ? 'body2' : 'body1'}
      color={isLock ? 'neutral.b04' : 'neutral.b06'}
      data-sign="title"
    >
      <RcBox display="flex" alignItems="center">
        <span className={styles.title} title={title}>
          {title}
        </span>
        {isLock && (
          <RcTooltip
            placement="bottom"
            data-sign="lockButtonTooltip"
            title={t('lockTooltip')}
          >
            <RcIcon
              size="small"
              color="neutral.f04"
              symbol={LockBorder}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
            />
          </RcTooltip>
        )}
      </RcBox>
    </RcTypography>
  );
};
