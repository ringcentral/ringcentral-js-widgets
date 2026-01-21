import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { CollapseLeftMd, CollapseRightMd } from '@ringcentral/spring-icon';
import { IconButton, IconButtonProps } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from './i18n';

interface ExpandLogButtonProps extends Omit<IconButtonProps, 'symbol'> {
  expanded: boolean;
  onExpand: () => void;
}

export const ExpandLogButton: FunctionComponent<ExpandLogButtonProps> = ({
  expanded,
  onExpand,
  color = 'secondary',
  size = 'small',
  iconSize = 'medium',
  variant = 'icon',
  ...rest
}) => {
  const { t } = useLocale(i18n);

  return (
    <IconButton
      data-sign="expand-log"
      data-expanded={expanded ? 'folded' : 'unfolded'}
      symbol={expanded ? CollapseLeftMd : CollapseRightMd}
      color={color}
      size={size}
      iconSize={iconSize}
      variant={variant}
      onClick={onExpand}
      TooltipProps={{
        title: t(expanded ? 'hideCallLog' : 'viewCallLog'),
      }}
      {...rest}
    />
  );
};
