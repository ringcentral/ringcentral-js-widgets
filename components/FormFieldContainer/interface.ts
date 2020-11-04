import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { PropsWithChildren } from 'react';

export const labelVariant = ObjectMap.fromKeys(['bold', 'normal']);

export type IFormFieldContainerProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  tooltip?: string;
  labelVariant?: keyof typeof labelVariant;
  ariaOwns?: string;
}>;
