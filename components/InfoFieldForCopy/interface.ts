import { IInfoFieldWithActionProps } from '../InfoFieldWithAction';

export type IInfoFieldForCopyProps = IInfoFieldWithActionProps & {
  onCopySuccess?: () => void;
  onCopyFailed?: () => void;
  currentLocale: string;
  value: string;
};
