import {
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
  When,
} from '@ringcentral-integration/test-utils';

import { EntryWithLoggedNavToSettings } from '../../../../../../app-demo-test/test/steps/Entry';
import {
  CheckToastAutoDismiss,
  CheckToastMessage,
} from '../../../../steps/Alert';
import { ClickItemByDataSign } from '../../../../steps/Common';
import { createMockFile } from '../../../../steps/Messages/Files/createMockFile';
import { selectFileFn } from '../../../../steps/Messages/Files/selectFileFn';

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
@title('RCI-7786: Error banner is displayed when add duplicate attachments')
export class RCI7786 extends Step {
  Login?: StepFunction<any, any> = EntryWithLoggedNavToSettings;

  run() {
    return (
      <Scenario desc="Show error when uploading duplicate file">
        <Given desc="Direct to entry point" action={this.Login} />

        <When
          desc="Click 'Contact support'"
          action={
            ((_, { app }) => {
              screen.getByTestId('ContactSupport').click();
            }) as StepFunction
          }
        />

        <When
          desc="Upload the same file twice"
          action={[
            (async (_, { app }) => {
              const file1 = {
                file: createMockFile('file1.txt', 100),
                size: 5 * 1024 * 1024,
                name: 'test1.png',
              };

              selectFileFn.mockImplementation((args, cb) => {
                cb([file1, file1]);
              });
            }) as StepFunction,
            <ClickItemByDataSign dataSign="attachFileBtn" />,
          ]}
        />

        <Then
          desc="Show duplicate file error banner"
          action={[
            <CheckToastMessage message="This file has already been uploaded." />,
          ]}
        />

        <Then
          desc="Error banner disappears after 5s"
          action={[
            <CheckToastAutoDismiss
              message="This file has already been uploaded."
              ttl={5000}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
