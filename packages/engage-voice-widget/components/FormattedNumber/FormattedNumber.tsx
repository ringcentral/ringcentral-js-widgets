import React, { FunctionComponent } from 'react';
import { format } from '@ringcentral-integration/phone-number';

export interface FormattedNumberProps {
  phoneNumber?: string;
  countryCode?: string;
}

export const FormattedNumber: FunctionComponent<FormattedNumberProps> = ({
  phoneNumber,
  countryCode,
}) => {
  return (
    <span>
      {(phoneNumber &&
        format({
          phoneNumber,
          countryCode,
        })) ||
        phoneNumber}
    </span>
  );
};

FormattedNumber.defaultProps = {
  phoneNumber: '',
  countryCode: 'US',
};
