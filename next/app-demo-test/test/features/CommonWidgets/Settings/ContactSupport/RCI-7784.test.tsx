import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  And,
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';
import { firstValueFrom, Subject } from 'rxjs';

import {
  CheckItemExistById,
  ClickItemByDataSign,
} from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { createMockFile } from '../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../steps/Messages/Files/selectFileFn';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { MockCPRCall } from '../../../../steps/Mock/MockCPRCall';
import { NavigateToSettings } from '../../../../steps/Navigate';
import { CheckEventTracking } from '../../../../steps/Tracking/CheckEventTracking';

@autorun(test)
@it
@p2
@common
@title('RCI-7784: Validate log sent to SCP and download works')
export class RCI7784 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  run() {
    const { Login, CreateMock } = this;
    const downloadCompleted$ = new Subject<void>();
    return (
      <Scenario desc="Submit CPR and validate log sent to SCP, then download logs">
        <Given desc="initial mocks" action={[CreateMock, <MockCPRCall />]} />
        <Given
          desc="login (creates the app instance)"
          action={[
            Login,
            ((_, { app }) => {
              const browserLogger = app.container.got(BrowserLogger)!;
              jest
                .spyOn(browserLogger as any, 'downloadSanitizedLogs')
                .mockImplementation(() => {
                  return firstValueFrom(downloadCompleted$);
                });
            }) as StepFunction,
          ]}
        />
        <And
          desc="User open a contact support page"
          action={[<NavigateToSettings />]}
        />
        <And
          desc="User click on Contact Support"
          action={<ClickItemByDataSign dataSign="ContactSupport" />}
        />

        <When
          desc="User uploads attachment and enters description"
          action={[
            (async (_, { app }) => {
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
              await waitForRenderReady();
            },
          ]}
        />

        <When
          desc="Auto-attached log is available"
          action={async () => {
            await whenStateChange(() => {
              const autoLog = screen.getByText((content) =>
                content.includes('applicationLogs.zip'),
              );
              expect(autoLog).toBeInTheDocument();
            });
          }}
        />

        <When
          desc="User clicks on download icon for ApplicationLogs.zip and verify MixPanel tracking"
          action={<ClickItemByDataSign dataSign="downloadButton" />}
        />

        <Then
          desc="Download button shows circular progress indicator and becomes disabled"
          action={[<CheckItemExistById dataSign="downloading" isExist />]}
        />

        <Then
          desc="Submit button is disabled during download"
          action={async () => {
            await whenStateChange(() => {
              const submitBtn = screen.getByTestId('submitBtn');
              expect(submitBtn).toBeDisabled();
            });
          }}
        />

        <Then
          desc="Download operation completes successfully and tracking event is fired"
          action={() => {
            downloadCompleted$.next();

            // Verify MixPanel tracking for download logs
            return (
              <CheckEventTracking
                toHaveBeenTracked={{
                  event: 'CPR_Logs_Downloaded',
                  trackProps: {},
                }}
              />
            );
          }}
        />

        <Then
          desc="Download button returns to normal state and submit button is enabled after download completes"
          action={[
            async () => {
              await whenStateChange(() => {
                const downloadBtn = screen.getByTestId('downloadButton');
                expect(downloadBtn).toBeEnabled();

                const submitBtn = screen.getByTestId('submitBtn');
                expect(submitBtn).toBeEnabled();
              });
            },
            <CheckItemExistById dataSign="downloading" isExist={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
