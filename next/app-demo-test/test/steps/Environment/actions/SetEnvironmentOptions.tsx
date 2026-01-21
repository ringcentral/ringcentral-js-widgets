import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { Environment } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const SetEnvironmentOptions: StepFunction<{
  server?: string;
  enable: boolean;
}> = ({ server, enable }, { app }) => {
  if (enable && !server) {
    throw new Error(`'server' is required when environment is enabled`);
  }

  // mock
  const environment = app.container.got(Environment);
  let newSdkConfig: SDKConfig = { clientId: '', clientSecret: '' };
  jest.spyOn(environment, 'changeEnvironment').mockImplementation(() => {
    newSdkConfig = environment._getSdkConfig();
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
