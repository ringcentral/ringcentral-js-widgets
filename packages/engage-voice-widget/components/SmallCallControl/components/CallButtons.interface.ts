import { CircleIconButtonProps } from '../../CircleIconButton';

export type CallButtonsProps = {
  currentLocale?: string;
  dataSign?: string;
} & Pick<CircleIconButtonProps, 'size' | 'placement' | 'className'>;
