import { PlusMd } from '@ringcentral/spring-icon';
import { IconButton } from '@ringcentral/spring-ui';
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
    <IconButton
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      color="primary"
      symbol={PlusMd}
    />
  );
}
