import { CPRClient } from '@ringcentral-integration/micro-setting/src/app/services';
import { CPRClientView } from '@ringcentral-integration/micro-setting/src/app/views';
import {
  autorun,
  Given,
  Scenario,
  screen,
  p2,
  it,
  common,
  Step,
  StepFunction,
  Then,
  title,
  When,
  userEvent,
} from '@ringcentral-integration/test-utils';
import { waitFor } from '@testing-library/react';

import { EntryWithLoggedNavToSettings } from '../../../../../../app-demo-test/test/steps/Entry';
import { CheckToastMessage } from '../../../../steps/Alert';
import { ClickItemByDataSign } from '../../../../steps/Common';
import { createMockFile } from '../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../steps/Messages/Files/selectFileFn';

@autorun(test)
@it
@p2
@common
@title(
  'RCI-7783: Error banner is displayed if user has has not permission for cpr',
)
export class RCI7783 extends Step {
  Login?: StepFunction<any, any> = EntryWithLoggedNavToSettings;

  run() {
    return (
      <Scenario desc="Error banner is displayed if user has has not permission for cpr">
        <Given desc="Direct to entry point," action={this.Login} />
        <Given
          desc="Mock CPRClient to return empty SCP url/token"
          action={
            ((_, { app }) => {
              const cprClient = app.container.got(CPRClient)!;
              jest
                .spyOn(cprClient, 'getEDRInfo')
                .mockImplementation(async () => {
                  return {
                    cprUri: '',
                    token: '',
                  };
                });
            }) as StepFunction
          }
        />
        <When
          desc="Click 'Contact support'"
          action={() => {
            screen.getByTestId('ContactSupport').click();
          }}
        />

        <When
          desc="User uploads a file and enters description"
          action={[
            (() => {
              const file1 = {
                file: createMockFile('test1.png', 100),
                size: 100,
                sizeText: '100',
                name: 'test.txt',
              };
              selectFileFn.mockImplementation((args, cb) => {
                cb([file1]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachFileBtn" />,
            async () => {
              await userEvent.type(
                screen.getByPlaceholderText('Tell us what the problem is...'),
                'Test description',
              );
            },
          ]}
        />
        <Then
          desc="'Submit' button becomes enabled"
          action={async () => {
            const submitBtn = screen.getByTestId('submitBtn');
            await waitFor(() => {
              expect(submitBtn).toBeEnabled();
            });
          }}
        />

        <When
          desc="Click 'Submit' button"
          action={async () => {
            const submitBtn = screen.getByTestId('submitBtn');
            await userEvent.click(submitBtn);
          }}
        />
        <Then
          desc="Verify CPR submission error banner is displayed"
          action={
            <CheckToastMessage message="Unable to submit report. Check permissions or try again later." />
          }
        />
      </Scenario>
    );
  }
}
