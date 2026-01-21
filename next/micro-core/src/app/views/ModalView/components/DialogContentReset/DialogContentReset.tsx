import { spacing, styled } from '@ringcentral/juno';
import type {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import React from 'react';

export type DialogContentResetProps = PropsWithChildren<{}> &
  HTMLAttributes<HTMLDivElement>;

const _DialogContentReset: FunctionComponent<DialogContentResetProps> = (
  props,
) => {
  const { children, ...rest } = props;

  return <div {...rest}>{children}</div>;
};

export const DialogContentReset = styled(_DialogContentReset)`
  margin: ${spacing(-5, -6, -3)};
`;
