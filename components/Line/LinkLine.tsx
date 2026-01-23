import { CaretRightMd } from '@ringcentral/spring-icon';
import { Icon } from '@ringcentral/spring-ui';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import { Line } from './Line';

type LinkLineProps = HTMLAttributes<HTMLAnchorElement>;

export const LinkLine: FunctionComponent<LinkLineProps> = ({
  onClick,
  children,
  ...rest
}) => {
  return (
    <Line
      component="a"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      icon={<Icon symbol={CaretRightMd} />}
      {...rest}
    >
      {children}
    </Line>
  );
};
