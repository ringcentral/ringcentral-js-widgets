import { RcBox, RcButton } from '@ringcentral/juno';
import {
  FormContextType,
  getSubmitButtonOptions,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';
import React from 'react';

/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
export default function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ uiSchema }: SubmitButtonProps<T, S, F>) {
  const {
    submitText,
    norender,
    props: submitButtonProps = {},
  } = getSubmitButtonOptions<T, S, F>(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <RcBox marginTop={3}>
      <RcButton
        type="submit"
        variant="contained"
        color="primary"
        {...submitButtonProps}
      >
        {submitText}
      </RcButton>
    </RcBox>
  );
}
