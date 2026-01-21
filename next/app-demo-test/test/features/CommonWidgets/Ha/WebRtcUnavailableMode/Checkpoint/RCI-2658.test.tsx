/**
 * RCI-2658: Verify the WebRTC errors
 * https://test_it_domain/test-cases/RCI-2658
 * Preconditions:
 * Open the Charles
 * Entry point(/s):
 *
 */
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../steps/Alert';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionDeviceList,
  MockMessageSync,
} from '../../../../../steps/Mock';

@autorun(test)
@common
@it
@p2
@title('Verify the WebRTC errors')
export class RCI2658 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin
      {...props}
      waitActiveCallControlReady={false}
      shouldMockWebphone={false}
      CreateInstance={CreateInstance}
    />
  );
  CreateMock: StepFunction<any, any> = CreateMock;

  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Verify the WebRTC errors">
        <When
          desc="Login app with RC account without DL
										Note: can test by simulating to get webRTC errors by Charles: (1)checkDLError"
          action={[
            CreateMock,
            MockMessageSync,
            <MockExtensionDeviceList errorCode={500} />,
            Login,
            (async (_, { app }) => {
              await app.modules.Webphone.connect();
            }) as StepFunction,
          ]}
        />
        <Then
          desc="Alert message:Unable to make outgoing call. Contact {brandName} for support if this error keeps showing.'"
          action={
            ((_, { app }) => {
              const brandName = app.modules.Brand.name;
              return (
                <CheckAlertMessage
                  message={`Unable to make outgoing call. Contact ${brandName} for support if this error keeps showing.`}
                />
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
