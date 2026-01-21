import { Divider, Text } from '@ringcentral/spring-ui';
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
    <div id={id} className="mb-1 mt-1">
      <Text className="typography-title">{title}</Text>
      <Divider />
    </div>
  );
}
