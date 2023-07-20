import type { FunctionComponent } from 'react';
import React from 'react';

import type { RcTextFieldProps } from '@ringcentral/juno';

import type { SelectListProps } from '../../../SelectList';
import { SelectList } from '../../../SelectList';
import { SelectListTextField } from './SelectListTextField/SelectListTextField';

export type FullSelectFieldProps = {
  TextFieldProps: Pick<RcTextFieldProps, 'helperText' | 'value'>;
  onFullSelectFieldClick?(field: string): void;
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
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onClick={() => onFullSelectFieldClick(field)}
      />
    </SelectList>
  );
};

FullSelectField.defaultProps = {
  TextFieldProps: {},
  onFullSelectFieldClick() {},
};
