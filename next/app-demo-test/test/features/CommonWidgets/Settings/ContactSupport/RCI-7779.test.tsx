import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  AdvanceTimersByTime,
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
  waitForRenderReady,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckToastAutoDismiss,
  CheckToastMessage,
} from '../../../../steps/Alert';
import { ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { createMockFile } from '../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../steps/Messages/Files/selectFileFn';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';
import { MockCPRCall } from '../../../../steps/Mock/MockCPRCall';
import { NavigateToSettings } from '../../../../steps/Navigate';

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
@title('RCI-7779: Error banner is displayed if log cannot be sent')
export class RCI7779 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  run() {
    const { Login, CreateMock } = this;

    return (
      <Scenario desc="Error banner is displayed if log cannot be sent">
        <Given
          desc="Navigate to entry point and mock downloadLogs + sendCPR failure"
          action={[
            CreateMock,
            <MockCPRCall status={500} />,
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
            Login,
            NavigateToSettings,
            <ClickItemByDataSign dataSign="ContactSupport" />,
          ]}
        />
        <When
          desc="User uploads a file and enters description"
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

        <Then
          desc="'Submit' button becomes enabled"
          action={async () => {
            await whenStateChange(() => {
              expect(screen.getByTestId('submitBtn')).toBeEnabled();
            });
          }}
        />

        <When
          desc="User clicks submit button"
          action={[
            UseFakeTimers,
            async () => {
              const submitBtn = screen.getByTestId('submitBtn');
              const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
              });
              await user.click(submitBtn);
            },
            WaitForRenderReady,
            <AdvanceTimersByTime ms={500} />,
            WaitForRenderReady,
          ]}
        />

        <Then
          desc="Show banner: 'Failed to submit. Please try again.' and form is kept"
          action={[
            <CheckToastMessage message="Failed to submit. Please try again." />,
            () => {
              expect(
                (
                  screen.getByPlaceholderText(
                    'Tell us what the problem is...',
                  ) as HTMLInputElement
                ).value,
              ).toBe('Test description');
              expect(screen.getByText('test.txt')).toBeInTheDocument();
            },
          ]}
        />

        <Then
          desc="Banner disappears after 5 seconds"
          action={[
            <CheckToastAutoDismiss
              ttl={5000}
              message="Failed to submit. Please try again."
            />,
          ]}
        />
      </Scenario>
    );
  }
}
