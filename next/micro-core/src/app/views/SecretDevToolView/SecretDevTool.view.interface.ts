import type { ReactNode } from 'react';

export interface SecretDevToolViewOptions {}

export type SecretDevToolProps = {
  show?: boolean;
  className?: string;
  useRenderProps?: () => SecretDevToolRenderProps;
};

export type SecretDevToolRenderProps = {
  online?: boolean;
  action?: ReactNode;
  header?: ReactNode;
  details?: ReactNode;
};
