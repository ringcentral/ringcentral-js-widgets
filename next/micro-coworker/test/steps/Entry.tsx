/* eslint-disable @typescript-eslint/no-var-requires */
import { RcViewModule, injectable } from '@ringcentral-integration/next-core';
import {
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { ReactElement, JSXElementConstructor } from 'react';

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

@injectable({
  name: 'AppView',
})
export class AppView extends RcViewModule {
  component() {
    return null;
  }
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
        const { createAppWithCoworker } = require('../../src/bootstrap');
        createAppWithCoworker({
          modules: [],
          main: AppView,
          render: () => {},
          share: {
            name: 'app-demo',
            type: 'Base',
          },
        });
        // await waitForRenderReady();
      }}
    </>
  );
};
