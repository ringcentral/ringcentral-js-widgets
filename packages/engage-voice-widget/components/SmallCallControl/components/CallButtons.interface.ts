import { CircleIconButtonProps } from '../../CircleIconButton';

export type CallButtonsProps = {
  currentLocale?: string;
} & Pick<CircleIconButtonProps, 'size' | 'placement' | 'className'>;
