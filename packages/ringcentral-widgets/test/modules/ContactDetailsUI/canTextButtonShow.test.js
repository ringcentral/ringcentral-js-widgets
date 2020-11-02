import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { phone } from './testUtils';

test("if composeText's dependency is not exist, then should return false", () => {
  /**
   * If phoneType = unknown(neither fax nor extension), result should be proportion to OutboundSMS permission
   * However if the composeText's dependency is not exist, then it should return false
   */
  const phoneType = phoneTypes.unknown;
  let { canTextButtonShow } = new ContactDetailsUI({
    ...phone,
    composeText: {},
    rolesAndPermissions: { permissions: { OutboundSMS: true } },
  }).getUIFunctions();

  expect(canTextButtonShow(phoneType)).toBeTruthy();

  canTextButtonShow = new ContactDetailsUI({
    ...phone,
    composeText: null,
    rolesAndPermissions: { permissions: { OutboundSMS: true } },
  }).getUIFunctions().canTextButtonShow;

  expect(canTextButtonShow(phoneType)).toBeFalsy();
});

test('if the phoneType is fax, then should return false', () => {
  const phoneType = phoneTypes.fax;

  const { canTextButtonShow } = new ContactDetailsUI({
    ...phone,
    composeText: {}, // not null
  }).getUIFunctions();

  expect(canTextButtonShow(phoneType)).toBeFalsy();
});

describe('Given phoneType is extension, the result is in proportion to the InternalSMS', () => {
  test.each`
    InternalSMS | expected
    ${true}     | ${true}
    ${false}    | ${false}
  `(
    'if InternalSMS = $InternalSMS, return $expected',
    ({ InternalSMS, expected }) => {
      const phoneType = phoneTypes.extension;

      const { canTextButtonShow } = new ContactDetailsUI({
        ...phone,
        composeText: {}, // not null
        rolesAndPermissions: { permissions: { InternalSMS } },
      }).getUIFunctions();

      expect(canTextButtonShow(phoneType)).toBe(expected);
    },
  );
});

describe('Given the phoneType is neither fax nor extension, then result is in proportion to OutboundSms', () => {
  test.each`
    OutboundSMS | expected
    ${true}     | ${true}
    ${false}    | ${false}
  `(
    `if OutboundSMS = $OutboundSMS, return $expected`,
    ({ OutboundSMS, expected }) => {
      const phoneTypeEnum = ObjectMap.filter((value) => {
        return value !== phoneTypes.extension && value !== phoneTypes.fax;
      }, phoneTypes);

      ObjectMap.forEach((phoneType) => {
        const { canTextButtonShow } = new ContactDetailsUI({
          ...phone,
          composeText: {}, // not null
          rolesAndPermissions: { permissions: { OutboundSMS } },
        }).getUIFunctions();

        expect(canTextButtonShow(phoneType)).toBe(expected);
      }, phoneTypeEnum);
    },
  );
});
