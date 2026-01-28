import { RcIconButton } from '@ringcentral/juno';
import { Add } from '@ringcentral/juno-icon';
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';
import React from 'react';

/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <RcIconButton
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      color="action.primary"
      symbol={Add}
    />
  );
}
