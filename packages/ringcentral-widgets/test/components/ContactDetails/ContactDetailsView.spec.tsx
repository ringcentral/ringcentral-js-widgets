import type { PhoneType } from '@ringcentral-integration/commons/enums/phoneTypes';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { render, userEvent } from '@ringcentral-integration/test-utils';
import React from 'react';

import { ContactDetailsView } from '../../../components/ContactDetailsView';
import type {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from '../../../components/ContactDetailsView/ContactDetailsView.interface';

type Props = ContactDetailsViewFunctionProps & ContactDetailsViewProps;

const getContact = (
  phoneNumber = '',
  phoneType: PhoneType = phoneTypes.extension,
) => {
  const contact: ContactModel = {
    name: '',
    type: '',
    status: '',
    phoneNumbers: [
      {
        phoneNumber,
        phoneType,
      },
    ],
    site: {
      id: '',
      name: '',
      code: '',
    },
  };
  return contact;
};

const getMockedProps = () => {
  const mockedProps: Props = {
    contact: getContact(),
    currentLocale: '',
    isCallButtonDisabled: false,
    isMultipleSiteEnabled: false,
    disableLinks: false,
    formatNumber: (phoneNumber) => phoneNumber,
    onBackClick() {},
    onClickMailTo() {},
    onClickToDial() {},
    onClickToSMS() {},
    canCallButtonShow: () => false,
    canTextButtonShow: () => false,
    showSpinner: false,
    sourceNodeRenderer: null,
  };
  return mockedProps;
};

describe('Profile Section - Give site name', () => {
  const originalNumber = '12345';
  const mockedProps = getMockedProps();
  const mockedContact = getContact(originalNumber);

  test('When disable multi-site, should not render the site field', () => {
    const expectedName = 'Belmont';
    const { queryByRole } = render(
      <ContactDetailsView
        {...mockedProps}
        contact={{
          ...mockedContact,
          site: { ...mockedContact.site, name: expectedName },
        }}
        isMultipleSiteEnabled={false}
      />,
    );
    const siteField = queryByRole('generic', {
      name: `Site: ${expectedName}`,
    });
    expect(siteField).toBeNull();
  });
  describe('When enable multi-site', () => {
    test('If site name is empty, should not render site field', () => {
      const expectedName = '';
      const mockedContact = getContact(originalNumber);
      const mockedProps = getMockedProps();
      const { queryByRole } = render(
        <ContactDetailsView
          {...mockedProps}
          contact={{
            ...mockedContact,
            site: { ...mockedContact.site, name: expectedName },
          }}
          isMultipleSiteEnabled
        />,
      );
      const siteField = queryByRole('generic', {
        name: `Site: ${expectedName}`,
      });
      expect(siteField).toBeNull();
    });
    test('If site name is not empty, Should render the site field', () => {
      const expectedName = 'Belmont';
      const mockedContact = getContact(originalNumber);
      const mockedProps = getMockedProps();
      const { getByText, getByRole } = render(
        <ContactDetailsView
          {...mockedProps}
          contact={{
            ...mockedContact,
            site: { ...mockedContact.site, name: expectedName },
          }}
          isMultipleSiteEnabled
        />,
      );
      const siteField = getByRole('generic', {
        name: `Site: ${expectedName}`,
      });
      const siteLabel = getByText('Site');
      const siteValue = getByText(expectedName);
      expect(siteField).toContainElement(siteLabel);
      expect(siteField).toContainElement(siteValue);
    });
  });
});

describe('Phone Section - Given at least one extension number', () => {
  const originalNumber = '12345';
  const formattedNumber = '123456789';
  const expectedContact = getContact(originalNumber);
  const mockedProps = getMockedProps();
  test.each`
    canCallBtnShow | expected | result
    ${true}        | ${true}  | ${'show'}
    ${false}       | ${false} | ${'hide'}
  `(
    'When canCallButtonShow is $canCallBtnShow, the call button should $result',
    ({ canCallBtnShow, expected }) => {
      const canCallButtonShow = jest
        .fn()
        .mockImplementation(() => canCallBtnShow);
      const { queryByTestId } = render(
        <ContactDetailsView
          {...mockedProps}
          canCallButtonShow={canCallButtonShow}
        />,
      );
      expect(canCallButtonShow).toHaveBeenCalledWith(
        mockedProps.contact.phoneNumbers[0].phoneType,
      );
      const callButton = queryByTestId('call');
      expected
        ? expect(callButton).not.toBeNull()
        : expect(callButton).toBeNull();
    },
  );

  test.each`
    canTextBtnShow | expected | result
    ${true}        | ${true}  | ${'show'}
    ${false}       | ${false} | ${'hide'}
  `(
    'When canTextButtonShow is $canTextBtnShow, then the text button should $result',
    ({ canTextBtnShow, expected }) => {
      const canTextButtonShow = jest
        .fn()
        .mockImplementation(() => canTextBtnShow);
      const { queryByTestId } = render(
        <ContactDetailsView
          {...mockedProps}
          canTextButtonShow={canTextButtonShow}
        />,
      );
      expect(canTextButtonShow).toHaveBeenCalledWith(
        mockedProps.contact.phoneNumbers[0].phoneType,
      );
      const textButton = queryByTestId('text');
      expected
        ? expect(textButton).not.toBeNull()
        : expect(textButton).toBeNull();
    },
  );

  describe.each`
    isMultipleSiteEnabled | toolTip            | displayNumber      | btnToolTipNumber   | useNumber          | result
    ${false}              | ${originalNumber}  | ${formattedNumber} | ${originalNumber}  | ${originalNumber}  | ${'replace only displaying number'}
    ${true}               | ${formattedNumber} | ${formattedNumber} | ${formattedNumber} | ${formattedNumber} | ${'replace tooltip, dialing, and displaying number'}
  `(
    'Given isMultipleSiteEnabled is $isMultipleSiteEnabled',
    ({
      isMultipleSiteEnabled,
      toolTip,
      displayNumber,
      btnToolTipNumber,
      useNumber,
      result,
    }) => {
      test(`FormattedNumber should ${result}`, () => {
        const formatNumber = jest
          .fn()
          .mockImplementation(() => formattedNumber);

        const { queryByTestId } = render(
          <ContactDetailsView
            {...mockedProps}
            contact={expectedContact}
            isMultipleSiteEnabled={isMultipleSiteEnabled}
            formatNumber={formatNumber}
          />,
        );
        expect(formatNumber).toHaveBeenCalledWith(originalNumber);
        const numberDisplay = queryByTestId('contactNumber', {});
        expect(numberDisplay.title).toBe(toolTip);
        expect(numberDisplay).toHaveTextContent(displayNumber);
      });
      test(`When click call button, should dial to correct number`, () => {
        const onClickToDial = jest.spyOn(mockedProps, 'onClickToDial');
        const { getByRole } = render(
          <ContactDetailsView
            {...mockedProps}
            contact={expectedContact}
            isMultipleSiteEnabled={isMultipleSiteEnabled}
            formatNumber={() => formattedNumber}
            canCallButtonShow={() => true}
          />,
        );
        const callButton = getByRole('button', {
          name: `Call ${btnToolTipNumber}`,
        });
        userEvent.click(callButton);
        expect(onClickToDial).toHaveBeenCalledWith(expectedContact, useNumber);
      });
      test(`When click text button, should compose text to correct number`, () => {
        const onClickToSMS = jest.spyOn(mockedProps, 'onClickToSMS');
        const { getByRole } = render(
          <ContactDetailsView
            {...mockedProps}
            contact={expectedContact}
            isMultipleSiteEnabled={isMultipleSiteEnabled}
            formatNumber={() => formattedNumber}
            canTextButtonShow={() => true}
          />,
        );
        const textButton = getByRole('button', {
          name: `Text ${btnToolTipNumber}`,
        });
        userEvent.click(textButton);
        expect(onClickToSMS).toHaveBeenCalledWith(expectedContact, useNumber);
      });
    },
  );
});
