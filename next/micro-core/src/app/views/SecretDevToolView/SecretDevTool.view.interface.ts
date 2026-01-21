export interface SecretDevToolViewOptions {}

export type SecretDevToolProps = {
  show?: boolean;
  className?: string;
  useRenderProps?: () => SecretDevToolRenderProps;
};

export type SecretDevToolRenderProps = {
  online?: boolean;
  action?: JSX.Element;
  header?: JSX.Element;
  details?: unknown;
};
