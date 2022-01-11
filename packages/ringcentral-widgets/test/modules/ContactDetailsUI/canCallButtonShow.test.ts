import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

test.skip("if dialerUI's dependency is not exist, should return false", () => {
  /**
   * isCallingEnabled permission = true && phoneType !== fax, should return true
   * However if the composeText's dependency is not exist, then it should return false
   */
  const phoneType = phoneTypes.extension;
  let { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    appFeatures: { isCallingEnabled: true },
  }).getUIFunctions(defaultPropsParams);

  expect(canCallButtonShow(phoneType)).toBeTruthy();

  ({ canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: null,
    appFeatures: { isCallingEnabled: true },
  }).getUIFunctions());

  expect(canCallButtonShow(phoneType)).toBeFalsy();
});

test.skip('when disable isCallingEnabled permission, result should return false', () => {
  const phoneType = phoneTypes.extension;
  const { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    appFeatures: { isCallingEnabled: false },
  }).getUIFunctions(defaultPropsParams);
  expect(canCallButtonShow(phoneType)).toBeFalsy();
});

// TODO: refactor to use IT
describe.skip('when enable isCallingEnabled permission', () => {
  const { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    appFeatures: { isCallingEnabled: true },
  }).getUIFunctions(defaultPropsParams);
  test('if phoneType = fax, return false', () => {
    const phoneType = phoneTypes.fax;
    expect(canCallButtonShow(phoneType)).toBeFalsy();
  });
  test("if phoneType isn't fax, return true", () => {
    const phoneTypeEnum = ObjectMap.filter((phoneType) => {
      return phoneType !== phoneTypes.fax;
    }, phoneTypes);
    ObjectMap.forEach((phoneType) => {
      expect(canCallButtonShow(phoneType)).toBeTruthy();
    }, phoneTypeEnum);
  });
});
