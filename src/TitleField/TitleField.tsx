import { RcBox, RcDivider, RcTypography } from '@ringcentral/juno';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from '@rjsf/utils';
import React from 'react';

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ id, title }: TitleFieldProps<T, S, F>) {
  return (
    <RcBox id={id} mb={1} mt={1}>
      <RcTypography variant="title1">{title}</RcTypography>
      <RcDivider />
    </RcBox>
  );
}
