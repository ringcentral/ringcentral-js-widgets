import { RcTextFieldProps } from '@ringcentral-integration/rcui';
import React, { FunctionComponent } from 'react';

import { SelectList, SelectListProps } from '../../../SelectList';
import { SelectListTextField } from './SelectListTextField/SelectListTextField';

export type FullSelectFieldProps = {
  TextFieldProps: Pick<RcTextFieldProps, 'helperText' | 'value'>;
} & SelectListProps;
export const FullSelectField: FunctionComponent<FullSelectFieldProps> = ({
  disabled,
  TextFieldProps,
  field,
  title,
  ...rest
}) => {
  const { helperText, value } = TextFieldProps;
  return (
    <SelectList disabled={disabled} field={field} title={title} {...rest}>
      <SelectListTextField
        data-sign={field}
        value={value}
        disabled={disabled}
        helperText={helperText}
        label={title}
      />
    </SelectList>
  );
};

FullSelectField.defaultProps = {
  TextFieldProps: {},
};
