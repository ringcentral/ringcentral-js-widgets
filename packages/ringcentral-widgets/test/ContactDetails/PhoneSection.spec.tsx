import React from 'react';
import { render, fireEvent, configure } from '@testing-library/react';
import { toHaveTextContent } from '@testing-library/jest-dom/matchers';
import phoneTypes from 'ringcentral-integration/enums/phoneTypes';
import { PhoneSection } from '../../components/ContactDetails/components/PhoneSection';

expect.extend({ toHaveTextContent });
configure({ testIdAttribute: 'data-sign' });

const onClickToDial = jest.fn().mockImplementation(() => {});
const phoneNumber = {
  phoneNumber: '12345',
  phoneType: phoneTypes.extension,
};
const mockedProps = {
  contact: {
    name: 'Bob',
    type: '',
    status: '',
    phoneNumbers: [phoneNumber],
  },
  currentLocale: '',
  disableLinks: true,
  isClickToDialEnabled: true,
  isCallButtonDisabled: false,
  isClickToTextEnabled: false,
  isMultipleSiteEnabled: false,
  formatNumber: (phoneNumber: string) => phoneNumber,
  internalSmsPermission: false,
  onClickToDial,
  onClickToSMS() {},
  outboundSmsPermission: false,
};

describe('Given at least one extension number', () => {
  test('When click call button, should dial to the correct phoneNumber', () => {
    const expectedPhone = phoneNumber.phoneNumber;
    const { getByRole, queryByTestId } = render(
      <PhoneSection {...mockedProps} />,
    );
    const numberDisplay = queryByTestId('contactNumber', {});
    expect(numberDisplay.title).toBe(expectedPhone);
    expect(numberDisplay).toHaveTextContent(expectedPhone);
    const callButton = getByRole('button', {
      name: `Call ${expectedPhone}`,
    });
    fireEvent.click(callButton);
    expect(onClickToDial).toHaveBeenCalledWith(
      mockedProps.contact,
      expectedPhone,
    );
  });
  // Test the interaction between formatNumber function and PhoneSection component
  test('When isMultipleSiteEnabled is false, the formattedNumber will only replace displaying number', () => {
    const originalNumber = phoneNumber.phoneNumber;
    const expectedFormattedNumber = '123456789';
    const { getByRole, queryByTestId } = render(
      <PhoneSection
        {...mockedProps}
        isMultipleSiteEnabled={false}
        formatNumber={() => expectedFormattedNumber}
      />,
    );
    const numberDisplay = queryByTestId('contactNumber', {});
    expect(numberDisplay.title).toBe(originalNumber);
    expect(numberDisplay).toHaveTextContent(expectedFormattedNumber);
    const callButton = getByRole('button', {
      name: `Call ${originalNumber}`,
    });
    fireEvent.click(callButton);
    expect(onClickToDial).toHaveBeenCalledWith(
      mockedProps.contact,
      originalNumber,
    );
  });
  test('When isMultipleSiteEnabled is true, the formattedNumber will replace both tooltip, dialing, and displaying number', () => {
    const expectedFormattedNumber = '123456789';
    const { getByRole, queryByTestId } = render(
      <PhoneSection
        {...mockedProps}
        isMultipleSiteEnabled
        formatNumber={() => expectedFormattedNumber}
      />,
    );
    const numberDisplay = queryByTestId('contactNumber', {});
    expect(numberDisplay.title).toBe(expectedFormattedNumber);
    expect(numberDisplay).toHaveTextContent(expectedFormattedNumber);
    const callButton = getByRole('button', {
      name: `Call ${expectedFormattedNumber}`,
    });
    fireEvent.click(callButton);
    expect(onClickToDial).toHaveBeenCalledWith(
      mockedProps.contact,
      expectedFormattedNumber,
    );
  });
});
