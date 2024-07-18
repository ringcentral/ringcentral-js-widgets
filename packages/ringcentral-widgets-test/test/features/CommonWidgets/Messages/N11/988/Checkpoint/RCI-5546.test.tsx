/**
 * RCI-5546: SMS to 988 with Non-US DL and included 988 extension uses
 * https://test_it_domain/test-cases/RCI-5546
 * Preconditions:
 * 1. It have already installed CTI.
 * Entry point(/s):
 * 
  | Account |Region |DL |Phone number |Include 988 extension users |
  | account 1 |UK |UK |988 |Yes |

 * > Login CTI with{Account}
 * > Send a message to{Phone number}
 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { getNodeText, screen } from '@testing-library/react';

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockCompanyPager,
  MockMessageSync,
  MockPostSMS,
  MockGetPhoneNumber,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

import errorMock from './mocks/errorResponseMock.json';
import extMock from './mocks/extResponseMock.json';
import specialMock from './mocks/specialServiceResponseMock.json';

@autorun(test)
@it
@p2
@title('SMS to 988 with Non-US DL and included 988 extension uses')
class smsToNoSpecialServiceButHasExtension extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;

  run() {
    const { Login, CreateMock } = this;
    const specialNumber = '988';

    return (
      <Scenario
        desc="EDP enabled and send message to 988 in a no-support special service country
            , and the account has a extension number is 988"
      >
        <When
          desc="Init mock and set up mocks data"
          action={[
            CreateMock,
            MockGetPhoneNumber,
            <MockMessageSync repeat={0} />,
            <MockNumberParserV2
              isDefaultInit={true}
              handler={() => {
                return extMock as any;
              }}
            />,
            <MockCompanyPager
              isDefaultInit
              handler={(mockData) => {
                mockData.from.extensionNumber = '101';
                mockData.to[0].extensionNumber = specialNumber;
                return mockData;
              }}
            />,
            <MockPostSMS
              isDefaultInit
              handler={() => errorMock as any}
              status={400}
            />,
          ]}
        />
        <Given desc="login App" action={Login} />
        <Then
          desc="App send the message successfully
										The extension number with 988 will receives the SMS"
          action={[
            <NavigateTo path="/composeText" />,
            <SendSMS phoneNumber={specialNumber} />,
          ]}
        />
        <Then
          desc="Checked the message Can send the message successfully"
          action={async () => {
            await waitUntilTo(() => {
              expect(
                screen.getByTestId('conversationPanel'),
              ).toBeInTheDocument();
            });
          }}
        />
      </Scenario>
    );
  }
}
