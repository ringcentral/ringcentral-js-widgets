import type { RcTextFieldProps } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import { SelectList, type SelectListProps } from '../../../SelectList';

import { SelectListTextField } from './SelectListTextField/SelectListTextField';

export type FullSelectFieldProps = {
  TextFieldProps: Pick<RcTextFieldProps, 'helperText' | 'value'>;
  onFullSelectFieldClick?: (field: string) => void;
} & SelectListProps;

export const FullSelectField: FunctionComponent<FullSelectFieldProps> = ({
  disabled,
  TextFieldProps,
  field,
  title,
  onFullSelectFieldClick,
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
        onClick={() => onFullSelectFieldClick?.(field!)}
      />
    </SelectList>
  );
};

FullSelectField.defaultProps = {
  TextFieldProps: {},
};
