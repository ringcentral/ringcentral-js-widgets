import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

describe('result is proportional to isMultipleSiteEnabled', () => {
  test.each`
    isMultiSiteEnabled | expected
    ${true}            | ${true}
    ${false}           | ${false}
  `(
    'Given isMultipleSiteEnabled = $isMultiSiteEnabled, return $expected',
    ({ isMultiSiteEnabled, expected }) => {
      const { isMultipleSiteEnabled } = new ContactDetailsUI({
        ...phone,
        extensionInfo: {
          isMultipleSiteEnabled: isMultiSiteEnabled,
        },
      }).getUIProps(defaultPropsParams);
      expect(isMultipleSiteEnabled).toBe(expected);
    },
  );
});
