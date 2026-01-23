import type {
  LiteralUnion,
  RcBoxProps,
  RcClassesProps,
  RcTypographyKeys,
} from '@ringcentral/juno';
import { RcBox, styled } from '@ringcentral/juno';
import React, { forwardRef } from 'react';

import { BoxStyle } from './styles';

export type BoxProps = {
  className?: string;
  m?: number;
  p?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  px?: number;
  py?: number;
  flexWidth?: LiteralUnion<'auto'>;
  typography?: RcTypographyKeys;
  flexCenter?: boolean;
  classes?: RcClassesProps<'typography'>['classes'];
} & RcBoxProps;

const _Box = forwardRef<any, BoxProps>(
  (
    {
      className,
      classes,
      children,
      m,
      p,
      mt,
      mb,
      ml,
      mr,
      mx,
      my,
      pt,
      pb,
      pl,
      pr,
      px,
      py,
      flexWidth,
      typography,
      flexCenter,
      ...rest
    },
    ref,
  ) => {
    return (
      <RcBox ref={ref} className={className} {...rest}>
        {children}
      </RcBox>
    );
  },
);

export const Box = styled(_Box)`
  ${BoxStyle}
`;

Box.displayName = 'Box';
