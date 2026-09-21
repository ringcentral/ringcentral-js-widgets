import {
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { waitUntilTo } from '@ringcentral-integration/utils';

import type { AppConfig } from '../../config';
import type { BrandCode } from '../lib/branding';
import { getAppConfig } from '../lib/branding';

import { CreateMock } from './Mock';

interface EntryProps {
  shouldInitMock?: boolean;
  manualMock?: boolean;
  mocks?: any;
  brandCode?: BrandCode;
  configMock?: {
    env: AppConfig['environment'];
    version?: AppConfig['version'];
  };
}

export const Entry: StepFunction<EntryProps> = async ({
  shouldInitMock = true,
  mocks,
  manualMock = false,
  brandCode = 'rc',
  configMock,
}) => {
  const appConfig = getAppConfig(brandCode);
  appConfig.environment = configMock?.env || 'dev';
  appConfig.version = {
    ...appConfig.version,
    ...configMock?.version,
  };

  return (
    <>
      {!manualMock && <CreateMock />}
      {mocks}
      {async () => {
        if (shouldInitMock) {
          global.instance.rcMock.init();
        }
        process.env = {
          ...process.env,
          APP_CONFIG: JSON.parse(JSON.stringify(appConfig)),
        };
        if (!document.getElementById('app')) {
          const appContainer = document.createElement('div');
          appContainer.id = 'app';
          document.body.appendChild(appContainer);
        }
        require('../../src/bootstrap');
        await waitForRenderReady();
        await waitUntilTo(() => {
          expect(screen.queryByText('Sign in')).toBeInTheDocument();
        });
      }}
    </>
  );
};
