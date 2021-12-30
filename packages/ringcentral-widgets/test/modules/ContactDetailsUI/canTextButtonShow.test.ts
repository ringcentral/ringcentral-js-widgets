import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

test("if composeText's dependency is not exist, then should return false", () => {
  /**
   * If phoneType = unknown(neither fax nor extension), result should be proportion to OutboundSMS permission
   * However if the composeText's dependency is not exist, then it should return false
   */
  const phoneType = phoneTypes.unknown;
  let { canTextButtonShow } = new ContactDetailsUI({
    ...phone,
    composeText: {},
    appFeatures: { hasOutboundSMSPermission: true },
  }).getUIFunctions(defaultPropsParams);

  expect(canTextButtonShow(phoneType)).toBeTruthy();

  canTextButtonShow = new ContactDetailsUI({
    ...phone,
    composeText: null,
    appFeatures: { hasOutboundSMSPermission: true },
  }).getUIFunctions(defaultPropsParams).canTextButtonShow;

  expect(canTextButtonShow(phoneType)).toBeFalsy();
});

test('if the phoneType is fax, then should return false', () => {
  const phoneType = phoneTypes.fax;

  const { canTextButtonShow } = new ContactDetailsUI({
    ...phone,
    composeText: {}, // not null
  }).getUIFunctions(defaultPropsParams);

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
        appFeatures: { hasInternalSMSPermission: InternalSMS },
      }).getUIFunctions(defaultPropsParams);

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
          appFeatures: { hasOutboundSMSPermission: OutboundSMS },
        }).getUIFunctions(defaultPropsParams);

        expect(canTextButtonShow(phoneType)).toBe(expected);
      }, phoneTypeEnum);
    },
  );
});
