export interface MoreActionWithForwardProps {
  disabled: boolean;
  currentLocale: string;
  forwardingNumbers: object[];
  forward: (forwardNumber: string) => Promise<void>;
  ignore: () => Promise<void>;
}
