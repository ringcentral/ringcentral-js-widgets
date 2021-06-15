import type { RcIconButtonSize } from '@ringcentral/juno';

export interface ICopyBtnProps {
  size?: RcIconButtonSize;
  value: string;
  currentLocale: string;
  handleSuccess?: () => void;
  handleFailure?: () => void;
}

export type InnerBtnProps = Pick<ICopyBtnProps, 'size' | 'currentLocale'> & {
  executeCopy: () => void;
};
