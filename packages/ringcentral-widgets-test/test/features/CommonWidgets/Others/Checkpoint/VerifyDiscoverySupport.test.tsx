import { fireEvent, screen, waitFor } from '@testing-library/react';

import type { Context } from '../../../../interfaces';
import type { StepProp } from '../../../../lib/step';
import {
  And,
  autorun,
  common,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '../../../../lib/step';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CreateMock } from '../../../../steps/Mock';

@autorun(test)
@common
@title('Verify discovery API support')
export class VerifyDiscoverySupport extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={() => {}} />
  );
  CreateMock: StepProp | null = CreateMock;
  EntryWithoutLogin: StepProp = async (props) => [
    <CreateInstance {...props} />,
    async (_: any, { phone }: Context) => {
      if (!phone.oAuth.oAuthReady) {
        await phone.oAuth.setOAuthReady(true);
      }
    },
  ];
  run() {
    const { Login, CreateMock, EntryWithoutLogin } = this;
    return (
      <Scenario desc="Verify discovery API support">
        <Given desc="Create mock" action={[CreateMock]} />
        <When desc="User has not login yet" action={EntryWithoutLogin} />
        <And
          desc="User click login button"
          action={async () => {
            await waitFor(() => screen.getByTestId('loginButton'));
            fireEvent.click(screen.getByTestId('loginButton'));
          }}
        />
        <Then
          desc="Check Discovery Initial API has been called"
          action={async () => {
            expect(this.context.rcMock.fetchMock).toHaveFetched(
              'http://whatever/.well-known/entry-points/initial?clientId=test key',
            );
          }}
        />
        <When desc="login app" action={Login} />
        <Then
          desc="Check Discovery External API has been called"
          action={async () => {
            expect(this.context.rcMock.fetchMock).toHaveFetched(
              'https://platform.devtest.ringcentral.com/.well-known/entry-points/external',
            );
          }}
        />
      </Scenario>
    );
  }
}
