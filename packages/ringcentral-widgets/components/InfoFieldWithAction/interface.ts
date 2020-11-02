import { PropsWithChildren } from 'react';
import { IFormFieldContainerProps } from '../FormFieldContainer';

export type IInfoFieldWithActionProps = PropsWithChildren<
  Pick<IFormFieldContainerProps, 'label' | 'tooltip' | 'labelVariant'> & {
    value: string | JSX.Element;
    name: string;
    btn?: JSX.Element;
    fullSize?: boolean;
    breakSpace?: boolean;
  }
>;
