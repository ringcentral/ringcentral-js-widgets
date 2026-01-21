import { OAuth } from '@ringcentral-integration/micro-auth/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  And,
  autorun,
  common,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CreateMock } from '../../../../steps/Mock';

@autorun(test)
@common
@title('Verify discovery API support')
export class VerifyDiscoverySupport extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={() => {}} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;
  EntryWithoutLogin: StepFunction<any, any> = async (props) => [
    <CreateInstance {...props} />,
    (async (_, { app }) => {
      const oAuth = app.container.got(OAuth)!;
      if (!oAuth.oAuthReady) {
        await oAuth.setOAuthReady(true);
      }
    }) as StepFunction,
  ];
  run() {
    const { Login, CreateMock, EntryWithoutLogin } = this;
    return (
      <Scenario desc="Verify discovery API support">
        <Given desc="Create mock" action={[CreateMock]} />
        <When
          desc="User has not login yet"
          action={<EntryWithoutLogin enableDiscovery />}
        />
        <And
          desc="User click login button"
          action={async () => {
            await whenStateChange(() => screen.getByTestId('loginButton'));
            fireEvent.click(screen.getByTestId('loginButton'));
          }}
        />
        <Then
          desc="Check Discovery Initial API has been called"
          action={
            (async (_, { rcMock }) => {
              expect(rcMock.fetchMock).toHaveFetched(
                new RegExp(
                  'https://api-xmrupxmn.intlabs_domain/.well-known/entry-points/initial',
                ),
              );
            }) as StepFunction
          }
        />
        <When desc="login app" action={Login} />
        <Then
          desc="Check Discovery External API has been called"
          action={
            (async (_, { rcMock }) => {
              expect(rcMock.fetchMock).toHaveFetched(
                'https://platform.devtest.ringcentral.com/.well-known/entry-points/external',
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
