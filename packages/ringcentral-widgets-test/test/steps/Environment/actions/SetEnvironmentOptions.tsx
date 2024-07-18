import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const SetEnvironmentOptions: StepFunction<{
  server?: string;
  enable: boolean;
}> = ({ server, enable }, context: Context) => {
  if (enable && !server) {
    throw new Error(`'server' is required when environment is enabled`);
  }

  // mock
  const { phone } = context;
  let newSdkConfig: SDKConfig = { clientId: '', clientSecret: '' };
  jest.spyOn(phone.environment, 'changeEnvironment').mockImplementation(() => {
    newSdkConfig = phone.environment.getSdkConfig();
  });

  // server
  const serverElem = screen.getByTestId('envServerUrl');
  expect(serverElem).toBeTruthy();
  userEvent.clear(serverElem);
  if (server) {
    userEvent.type(serverElem, server);
  }

  // enable
  const toggleElem = screen.getByTestId('envToggle');
  expect(toggleElem).toBeTruthy();
  if (enable) {
    userEvent.click(toggleElem);
  }

  // save
  const saveElem = screen.getByTestId('envSave');
  expect(saveElem).toBeTruthy();
  userEvent.click(saveElem);

  // check after save
  expect(newSdkConfig.clientId).toBeTruthy();
  expect(newSdkConfig.clientSecret).toBeTruthy();
  expect(newSdkConfig.server).toEqual(server);
};
