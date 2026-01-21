import { RcFormHelperText } from '@ringcentral/juno';
import {
  helpId,
  FieldHelpProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldHelpProps<T, S, F>) {
  const { idSchema, help } = props;
  if (!help) {
    return null;
  }
  const id = helpId<T>(idSchema);
  return <RcFormHelperText id={id}>{help}</RcFormHelperText>;
}
