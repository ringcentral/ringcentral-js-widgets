import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

describe('If all dependencies = false, return false; Otherwise return true ', () => {
  test.each`
    isOfflineMode | isVoipOnlyMode | isThrottling | expected
    ${true}       | ${false}       | ${false}     | ${true}
    ${false}      | ${true}        | ${false}     | ${true}
    ${false}      | ${false}       | ${true}      | ${true}
    ${false}      | ${false}       | ${false}     | ${false}
  `(
    'Given isOfflineMode = $isOfflineMode, isVoipOnlyMode = $isVoipOnlyMode, isThrottling = $isThrottling, return $expected',
    ({ isOfflineMode, isVoipOnlyMode, isThrottling, expected }) => {
      const { disableLinks } = new ContactDetailsUI({
        ...phone,
        connectivityManager: {
          isOfflineMode,
          isVoipOnlyMode,
        },
        rateLimiter: {
          throttling: isThrottling,
        },
      }).getUIProps(defaultPropsParams);

      expect(disableLinks).toBe(expected);
    },
  );
});
