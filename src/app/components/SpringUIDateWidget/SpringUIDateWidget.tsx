import { DatePicker } from '@ringcentral/spring-ui';
import type { FieldProps } from '@rjsf/utils';
import React from 'react';

export const SpringUIDateWidget: React.FC<FieldProps> = ({
  onChange,
  disabled,
  formData,
  readonly,
  required,
  schema,
}) => {
  const dateValue = formData ? new Date(formData) : null;

  return (
    <DatePicker
      value={dateValue}
      size="medium"
      variant="outlined"
      onChange={(date) => {
        const convertedDate = schema?.convertDateFunction
          ? schema.convertDateFunction(date)
          : date;
        onChange(convertedDate);
      }}
      disabled={disabled || readonly}
      fullWidth
      label={schema.title}
      required={required}
      clearBtn={false}
    />
  );
};
