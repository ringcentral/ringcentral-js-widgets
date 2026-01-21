import { waitTickFor } from '@ringcentral-integration/core/test';
import {
  AccountInfo,
  Auth,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test/lib/whenStateChange';
import {
  AdvanceTimersByTime,
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
  UseFakeTimers,
  userEvent,
  WaitForRenderReady,
  When,
  within,
} from '@ringcentral-integration/test-utils';
import JSZip from 'jszip';

import { CheckToastMessage } from '../../../../steps/Alert';
import { CheckTooltip, ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { createMockFile } from '../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../steps/Messages/Files/selectFileFn';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { MockCPRCall } from '../../../../steps/Mock/MockCPRCall';
import { NavigateToSettings } from '../../../../steps/Navigate';
import { CheckEventTracking } from '../../../../steps/Tracking';

const folderInfo = {
  data: null,
} as any;

jest.spyOn(JSZip.prototype, 'loadAsync').mockImplementation(async (data) => {
  folderInfo.data = data;

  return {
    generateAsync: jest.fn(() => {
      return new Blob(['mock-content']);
    }),
    folder: jest.fn((folderName) => {
      folderInfo[folderName] = {};

      return {
        file: jest.fn((name, base64Data, options) => {
          folderInfo[folderName][name] = {
            base64Data,
            options,
          };
        }),
      } as any;
    }),
  } as any;
});

jest.mock('use-file-upload', () => {
  const { selectFileFn } = jest.requireActual(
    '../../../../steps/Messages/Files/selectFileFn',
  );

  return {
    __esModule: true,
    useFileUpload: () => {
      return [null, selectFileFn];
    },
  };
});

@autorun(test)
@it
@p2
@common
@title('RCI-7778: Submit feedback')
export class RCI7778 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Submit feedback from Step 2">
        <Given
          desc="initial mocks"
          action={[
            CreateMock,
            <MockCPRCall />,
            (async (_, { app }) => {
              // Mock URL APIs to avoid JSDOM issues
              Object.defineProperty(URL, 'createObjectURL', {
                value: jest.fn(() => 'blob:mock-url'),
                configurable: true,
              });
              Object.defineProperty(URL, 'revokeObjectURL', {
                value: jest.fn(),
                configurable: true,
              });
            }) as StepFunction,
          ]}
        />
        <Given desc="login (creates the app instance)" action={[Login]} />
        <And
          desc="User open a contact support page"
          action={NavigateToSettings}
        />
        <And
          desc="User click on Contact Support"
          action={() => {
            userEvent.click(screen.getByTestId('ContactSupport'));
          }}
        />

        <Then
          desc="App log is attached"
          action={() => {
            expect(screen.getByText('applicationLogs.zip')).toBeInTheDocument();
          }}
        />

        <When
          desc="Hover over download icon and verify tooltip"
          action={
            <CheckTooltip
              dataSign="downloadButton"
              tooltip="Download logs for your reference"
            />
          }
        />

        <When
          desc="Click 'Add attachment' and pick 2 files (test1.png, test2.txt)"
          action={[
            (async (_, { app }) => {
              const file1 = {
                file: createMockFile('test1.png', 100),
                size: 100,
                sizeText: '100',
                name: 'test1.png',
              };
              const file2 = {
                file: createMockFile('test2.txt', 100),
                size: 100,
                sizeText: '100',
                name: 'test2.txt',
              };

              selectFileFn.mockImplementation((args, cb) => {
                cb([file1, file2]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachFileBtn" />,
          ]}
        />

        <Then
          desc="All selected files appear under 'Add attachment' section"
          action={async () => {
            const attachments = within(screen.getByTestId('attachments'));
            await whenStateChange(() => {
              expect(attachments.getByText('test1.png')).toBeInTheDocument();
              expect(attachments.getByText('test2.txt')).toBeInTheDocument();
            });
          }}
        />

        <When
          desc="User enters some text in the Description field"
          action={() => {
            const descInput = screen.getByPlaceholderText(
              'Tell us what the problem is...',
            ) as HTMLInputElement;
            userEvent.type(descInput, 'Issue description');
          }}
        />

        <Then
          desc="'Submit' button becomes enabled"
          action={() => {
            const submitBtn = screen.getByTestId('submitBtn');
            expect(submitBtn).toBeEnabled();
          }}
        />

        <When
          desc="Click 'Submit' button and verify MixPanel tracking"
          action={[
            UseFakeTimers,
            () => {
              const submitBtn = screen.getByTestId('submitBtn');
              userEvent.click(submitBtn);
            },
            WaitForRenderReady,
            WaitForRenderReady,
            // the CPR have a threshold to wait for the submission
            <AdvanceTimersByTime ms={500} />,
            WaitForRenderReady,
            <CheckEventTracking
              toHaveBeenTracked={{
                event: 'CPR_Submitted',
                trackProps: {},
              }}
            />,
            (async (_, { rcMock }) => {
              await waitTickFor(() => {
                expect(rcMock.fetchMock).toHaveFetchedTimes(
                  1,
                  (url) => url.indexOf('/cpr-api/v1/problem-reports') > -1,
                );
              }, 100);
            }) as StepFunction,
          ]}
        />
        <Then
          desc="Validate log sent to CPR API includes correct metadata"
          action={
            (async (_, { app, rcMock }) => {
              const brand = app.container.got(Brand)!;
              const sdkConfig = app.container.got('SdkConfig') as any;
              const accountInfo = app.container.got(AccountInfo)!;
              const extensionInfo = app.container.got(ExtensionInfo)!;
              const auth = app.container.got(Auth)!;

              const call = rcMock.fetchMock
                .calls()
                .find(
                  ([url, info]) =>
                    url.indexOf('/cpr-api/v1/problem-reports') > -1,
                );

              const formData = call?.[1]?.body as FormData;

              expect(call?.[1]?.headers).toEqual({
                authorization: 'Bearer mocked-cpr-token',
              });

              const problemReportBlob = formData.get(
                'problemReportRequest',
              ) as Blob;

              expect(problemReportBlob).toBeInstanceOf(Blob);
              expect(problemReportBlob.type).toBe('application/json');

              const reportFile = formData.get('problemReportRequest') as File;
              const symKey = Reflect.ownKeys(reportFile)[0];
              const problemReportJson = JSON.parse(
                (reportFile as any)[symKey]._buffer.toString('utf8'),
              );

              const zipFile = formData.get('attachments') as File;
              const zipSymKey = Reflect.ownKeys(zipFile)[0];
              const zipBuffer = (zipFile as any)[zipSymKey]._buffer;

              expect(problemReportJson).toEqual(
                expect.objectContaining({
                  description: 'Issue description',
                  title: 'Automated Log Submission',
                  clientAppType: 'RCIntegrationAppWeb',
                  productCategory: brand.application,
                  brandId: brand.id,
                  clientVersion: sdkConfig.appVersion || '1.0.0',
                  accountId: String(accountInfo.id),
                  userId: extensionInfo.id.toString(),
                  clientDetails: expect.any(String),
                  clientEndpointId: auth.token.endpointId,
                  clientId: sdkConfig.clientId,
                  creationTime: expect.any(String),
                  submitterEmail: extensionInfo.data?.contact?.email,
                }),
              );

              expect(zipBuffer).toBeDefined();
              expect(zipBuffer.length).toBeGreaterThan(0);

              expect(folderInfo).toEqual(
                expect.objectContaining({
                  data: expect.any(String),
                  'applicationLogs/attachments': {
                    'test2.txt': expect.objectContaining({
                      base64Data: expect.any(String),
                      options: { base64: true },
                    }),
                    'test1.png': expect.objectContaining({
                      base64Data: expect.any(String),
                      options: { base64: true },
                    }),
                  },
                }),
              );
            }) as StepFunction
          }
        />

        <Then
          desc="success message is shown and form is reset"
          action={[
            <CheckToastMessage message="Issue submitted." />,
            async () => {
              expect(
                screen.getByPlaceholderText('Tell us what the problem is...'),
              ).toHaveValue('');
              expect(screen.queryByText('test1.png')).not.toBeInTheDocument();
              expect(screen.queryByText('test2.txt')).not.toBeInTheDocument();
            },
          ]}
        />
      </Scenario>
    );
  }
}
