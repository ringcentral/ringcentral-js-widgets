import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { defaultPropsParams, phone } from './testSetup';

describe('If all dependencies = false, return false; Otherwise return true', () => {
  test.each`
    isOfflineMode | isWebphoneUnavailableMode | isWebphoneInitializing | isThrottling | expected
    ${true}       | ${false}                  | ${false}               | ${false}     | ${true}
    ${false}      | ${true}                   | ${false}               | ${false}     | ${true}
    ${false}      | ${false}                  | ${true}                | ${false}     | ${true}
    ${false}      | ${false}                  | ${false}               | ${true}      | ${true}
    ${false}      | ${false}                  | ${false}               | ${false}     | ${false}
  `(
    'Given isOfflineMode = $isOfflineMode, isWebphoneUnavailableMode = $isWebphoneUnavailableMode, isWebphoneInitializing = $isWebphoneInitializing, isThrottling = $isThrottling, return $expected',
    ({
      isOfflineMode,
      isWebphoneUnavailableMode,
      isWebphoneInitializing,
      isThrottling,
      expected,
    }) => {
      const { isCallButtonDisabled } = new ContactDetailsUI({
        ...phone,
        connectivityManager: {
          isOfflineMode,
          isWebphoneUnavailableMode,
          isWebphoneInitializing,
        },
        rateLimiter: {
          throttling: isThrottling,
        },
      }).getUIProps(defaultPropsParams);

      expect(isCallButtonDisabled).toBe(expected);
    },
  );
});
