import { formatNumber as mockFormatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  isE164 as mockIsE164,
  parseIncompletePhoneNumber as mockParseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';

import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

jest.mock('@ringcentral-integration/phone-number', () => ({
  isE164: jest.fn(),
  parseIncompletePhoneNumber: jest.fn(),
}));

jest.mock('@ringcentral-integration/commons/lib/formatNumber', () => ({
  formatNumber: jest.fn(),
}));

/**
 * TODO: need to add origin phoneNumber so as to make the test correspond to prod/development environment
 */
const phoneNumber = '(205) 871-1434';
const cleanNumber = '2058711434';
const formattedNumber = '+12058711434';
const defaultProps = {
  ...phone,
  regionSettings: { countryCode: '' },
};

afterEach(() => {
  mockIsE164.mockReset();
  mockParseIncompletePhoneNumber.mockReset();
  mockFormatNumber.mockReset();
});

test("if phoneNumber's format is E164, it should return formattedNumber", () => {
  mockIsE164.mockReturnValueOnce(true);
  mockFormatNumber.mockReturnValueOnce(formattedNumber);
  mockParseIncompletePhoneNumber.mockReturnValueOnce(cleanNumber);

  const result = new ContactDetailsUI(defaultProps)
    .getUIFunctions(defaultPropsParams)
    .formatNumber(phoneNumber);

  expect(result).toBe(formattedNumber);
});

test("if phoneNumber isn't an E164 nor an extension, it should keep the number intact", () => {
  const phoneNumber = '324645356773456456';
  mockIsE164.mockReturnValueOnce(false);
  const instance = new ContactDetailsUI(defaultProps);
  expect(mockFormatNumber).not.toBeCalled();
  const result = instance
    .getUIFunctions(defaultPropsParams)
    .formatNumber(phoneNumber);
  expect(result).toBe(phoneNumber);
});

test('if phoneNumber is an extension, it should keep the number intact', () => {
  const phoneNumber = '24705';
  mockIsE164.mockReturnValueOnce(false);
  const instance = new ContactDetailsUI(defaultProps);
  const result = instance
    .getUIFunctions(defaultPropsParams)
    .formatNumber(phoneNumber);
  expect(mockFormatNumber).not.toBeCalled();
  expect(mockParseIncompletePhoneNumber).toBeCalledWith(phoneNumber);
  expect(result).toBe(phoneNumber);
});

describe('multiple site feature(just for extension)', () => {
  test('if site code is empty, then it should keep the number intact', () => {
    const phoneNumber = '24705';
    mockIsE164.mockReturnValueOnce(false);
    const instance = new ContactDetailsUI({
      ...defaultProps,
      extensionInfo: {
        isMultipleSiteEnabled: true,
        site: null,
      },
    });
    const result = instance
      .getUIFunctions(defaultPropsParams)
      .formatNumber(phoneNumber);
    expect(mockFormatNumber).not.toBeCalled();
    expect(mockParseIncompletePhoneNumber).toBeCalledWith(phoneNumber);
    expect(result).toBe(phoneNumber);
  });

  test('if the multi site feature is disabled, then it should keep the number intact', () => {
    const phoneNumber = '24705';
    mockIsE164.mockReturnValueOnce(false);
    const instance = new ContactDetailsUI({
      ...defaultProps,
      extensionInfo: {
        isMultipleSiteEnabled: false,
      },
    });
    const result = instance
      .getUIFunctions(defaultPropsParams)
      .formatNumber(phoneNumber);
    expect(mockFormatNumber).not.toBeCalled();
    expect(mockParseIncompletePhoneNumber).toBeCalledWith(phoneNumber);
    expect(result).toBe(phoneNumber);
  });

  // just part of case of multiple site, the rest case is written in formatNumber's unit test
  describe('if multiple site feature is enabled', () => {
    test.each`
      siteCode | extension  | expected
      ${'24'}  | ${'24705'} | ${'705'}
      ${'24'}  | ${'23705'} | ${'23705'}
    `(
      'if current siteCode is $siteCode and the extension is $extension, then it should return $expected',
      ({ siteCode, extension, expected }) => {
        mockIsE164.mockReturnValueOnce(false);
        mockFormatNumber.mockReturnValueOnce(expected);
        const instance = new ContactDetailsUI({
          ...defaultProps,
          extensionInfo: {
            isMultipleSiteEnabled: true,
            site: {
              code: siteCode,
            },
          },
        });
        const result = instance
          .getUIFunctions(defaultPropsParams)
          .formatNumber(extension);
        expect(result).toBe(expected);
      },
    );
  });
});
