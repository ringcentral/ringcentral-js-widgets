import type { StepFunction } from '@ringcentral-integration/test-utils';

import { CreateInstance } from './CreateInstance';
import { Login } from './Login';
import { CreateMock } from './Mock';
import { NavigateToSettings } from './Navigate/actions';

interface EntryProps {
  shouldInitMock?: boolean;
  manualMock?: boolean;
  enableDiscovery?: boolean;
  mocks?: any;
  brand?: string;
}

export const Entry: StepFunction<EntryProps> = async ({
  shouldInitMock = true,
  manualMock = false,
  enableDiscovery = false,
  mocks,
  brand,
}) => {
  return (
    <>
      {!manualMock && <CreateMock />}
      {mocks}
      <CreateInstance
        shouldInitMock={shouldInitMock}
        enableDiscovery={enableDiscovery}
        shouldMockDevices={false}
        enableWebphone={false}
        brand={brand}
      />
    </>
  );
};

export const EntryWithLoggedNavToSettings: StepFunction = async () => [
  Entry,
  Login,
  NavigateToSettings,
];
