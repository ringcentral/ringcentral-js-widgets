import { Text } from '@ringcentral/spring-ui';
import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: DescriptionFieldProps<T, S, F>) {
  const { id, description } = props;
  if (description) {
    return (
      <Text id={id} className="typography-mainText mt-5">
        {description}
      </Text>
    );
  }

  return null;
}
