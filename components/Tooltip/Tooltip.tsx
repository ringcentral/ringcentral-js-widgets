import { Tooltip as BaseTooltip, TooltipProps } from '@ringcentral/spring-ui';
import React, { FunctionComponent } from 'react';

/**
 * workaround for Tooltip component from spring-ui
 *
 * TODO: spring-ui should be removed after spring-ui release a new version
 */
export const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  title,
  ...rest
}) => {
  if (!title) return children;

  return (
    <BaseTooltip title={title} {...rest}>
      {children}
    </BaseTooltip>
  );
};
