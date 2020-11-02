import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { phone } from './testUtils';

test("if dialerUI's dependency is not exist, should return false", () => {
  /**
   * callingEnabled permission = true && phoneType !== fax, should return true
   * However if the composeText's dependency is not exist, then it should return false
   */
  const phoneType = phoneTypes.extension;
  let { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    rolesAndPermissions: { callingEnabled: true },
  }).getUIFunctions();

  expect(canCallButtonShow(phoneType)).toBeTruthy();

  ({ canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: null,
    rolesAndPermissions: { callingEnabled: true },
  }).getUIFunctions());

  expect(canCallButtonShow(phoneType)).toBeFalsy();
});

test('when disable callingEnabled permission, result should return false', () => {
  const phoneType = phoneTypes.extension;
  const { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    rolesAndPermissions: { callingEnabled: false },
  }).getUIFunctions();
  expect(canCallButtonShow(phoneType)).toBeFalsy();
});

describe('when enable callingEnabled permission', () => {
  const { canCallButtonShow } = new ContactDetailsUI({
    ...phone,
    dialerUI: {},
    rolesAndPermissions: { callingEnabled: true },
  }).getUIFunctions();
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
