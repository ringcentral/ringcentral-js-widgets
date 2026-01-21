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
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckToastAutoDismiss,
  CheckToastMessage,
  CloseAlertMessage,
} from '../../../../steps/Alert';
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
@title('RCI-7782: Error banner is displayed if user attachments exceed 10MB')
export class RCI7782 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;

  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Error banner is displayed if user attachments exceed 10MB">
        <Given
          desc="Direct to entry point,"
          action={[CreateMock, <MockCPRCall />, Login, NavigateToSettings]}
        />
        <When
          desc="Click 'Contact support'"
          action={() => {
            userEvent.click(screen.getByTestId('ContactSupport'));
          }}
        />
        <Then
          desc="Large auto log appears"
          action={() => {
            expect(screen.getByText('applicationLogs.zip')).toBeInTheDocument();
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
        <And
          desc="Try to attach a file that exceeds the 10MB user attachment limit"
          action={[
            (async (_, { app }) => {
              const file1 = {
                file: createMockFile('test1.png', 100),
                size: 11 * 1024 * 1024,
                name: 'test1.png',
              };

              selectFileFn.mockImplementation((args, cb) => {
                cb([file1]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachFileBtn" />,
          ]}
        />
        <Then
          desc="Should show toast warning for exceeding file size"
          action={[
            <CheckToastMessage message="Attachment should be 10MB or smaller. Please choose other files." />,
          ]}
        />

        <Then
          desc="Banner disappears after 5 seconds"
          action={[
            <CheckToastAutoDismiss
              message="Attachment should be 10MB or smaller. Please choose other files."
              ttl={5000}
            />,
            CloseAlertMessage,
          ]}
        />
        <When
          desc="Add 1 user attachment of which size does not exceed 10MB and add another file to make the combined size exceed 10MB"
          action={[
            (async (_, { app }) => {
              const file1 = {
                file: createMockFile('file1.txt', 100),
                size: 5 * 1024 * 1024,
                name: 'test1.png',
              };
              const file2 = {
                file: createMockFile('file2.txt', 100),
                size: 6 * 1024 * 1024,
                name: 'test2.png',
              };

              selectFileFn.mockImplementation((args, cb) => {
                cb([file1, file2]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachFileBtn" />,
          ]}
        />
        <Then
          desc="Should show toast warning for exceeding file size"
          action={
            <CheckToastMessage message="Attachment should be 10MB or smaller. Please choose other files." />
          }
        />
        <Then
          desc="Banner disappears after 5 seconds"
          action={[
            <CheckToastAutoDismiss
              message="Attachment should be 10MB or smaller. Please choose other files."
              ttl={5000}
            />,
          ]}
        />
        <When
          desc="Remove the file"
          action={[<ClickItemByDataSign dataSign="removeBtn" />]}
        />
        <Then
          desc="File is removed"
          action={[<CheckItemExistById dataSign="file1.txt" isExist={false} />]}
        />
      </Scenario>
    );
  }
}
