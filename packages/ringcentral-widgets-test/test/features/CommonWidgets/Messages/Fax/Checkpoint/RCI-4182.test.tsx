/**
 * RCI-4182: Fax tab should hide when the login user without fax permission
 * https://test_it_domain/test-cases/RCI-4182
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA without fax permission
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { MockPermission } from '../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate/actions/NavigateToMessages';

interface IFaxProps {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}
@autorun(test.skip)
@it
@p2
@title('Fax tab should hide when the login user without fax permission')
export class FaxTabShouldHide extends Step<IFaxProps> {
  CustomLogin = null;
  CustomCreateMock = null;

  run() {
    return (
      <Scenario
        desc="Fax tab should hide when the login user without fax permission"
        action={() => [
          this.CustomCreateMock,
          <MockPermission
            handler={(permissions) => {
              return permissions
                .filter((permission) => permission.id !== 'FaxReceiving')
                .concat([{ id: 'FaxReceiving', available: false }]);
            }}
          />,
        ]}
      >
        <Given
          desc="UserA has contact 'Test contact', mock his extension info"
          action={this.CustomLogin}
        />
        <When
          desc="> Go to the Entry point
                  > Check the fax with {Contacts}
                  > Expand the fax"
          action={[NavigateToMessagesTab]}
        />
        <Then
          desc="should not show fax tab"
          action={async () => {
            expect(
              screen.getByTestId('ConversationsPanel'),
            ).toBeInTheDocument();
            expect(screen.queryByTestId('Fax')).not.toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
