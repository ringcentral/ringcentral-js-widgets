import React, { FunctionComponent } from 'react';

import { RcTextField, RcTextFieldProps } from '@ringcentral/juno';

import { CustomArrowButton } from '../../../../Rcui/CustomArrowButton';
import styles from '../styles.scss';

export type SelectListTextFieldProps = Pick<
  RcTextFieldProps,
  'value' | 'disabled' | 'helperText' | 'label' | 'onClick' | 'required'
>;

export const SelectListTextField: FunctionComponent<SelectListTextFieldProps> =
  ({ value, disabled, ...rest }) => {
    return (
      <RcTextField
        {...rest}
        title={`${value}`}
        value={value}
        gutterBottom
        disabled={disabled}
        InputProps={{
          classes: {
            input: styles.customTextField,
          },
          readOnly: true,
          endAdornment: <CustomArrowButton disabled={disabled} />,
        }}
        fullWidth
        clearBtn={false}
      />
    );
  };
