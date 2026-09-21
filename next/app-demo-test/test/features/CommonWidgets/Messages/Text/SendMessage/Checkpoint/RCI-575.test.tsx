/**
 * RCI-575: Send text message from other number on compose text page
 * https://test_it_domain/test-cases/RCI-575
 * Preconditions:
 * User has logged into the 3rd party
 * CTI app is integrated.
 * User has logged into CTI app with Account_A
 * Account_A have configure DID and DL numbers
 *
  | Number type |Numbers |
  | DID_1 |(818) 982-3302 |
	| DID_2 |(818) 858-7301 |
	| DL |(301) 444-5036 |

 * Entry point(/s):
 * Compose text
 */
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  And,
  autorun,
  fireEvent,
  Given,
  it,
  p2,
  Scenario,
  screen,
  Step,
  Then,
  title,
  userEvent,
  waitForRenderReady,
  When,
  StepFunction,
  common,
} from '@ringcentral-integration/test-utils';

import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CheckButton,
  ClickMessageFromField,
  InputSMS,
  TypeMessageInput,
} from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockPostOauthToken,
  MockPostSMS,
} from '../../../../../../steps/Mock';
import { Relogin } from '../../../../../../steps/Relogin';
import { NavigateTo } from '../../../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('Send text message from other number on compose text page')
export class RCI575 extends Step {
  CommonLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  Relogin: StepFunction<any, any> = Relogin;
  CheckComposeTextFromField: StepFunction<any, any> = () => {
    const element = screen.getByTestId('dropdownSelect');
    expect(element).toHaveTextContent('From:(818) 858-7301');
  };

  senderNumbers = [
    { usageType: 'DirectNumber', number: '(818) 982-3302' },
    { usageType: 'DirectNumber', number: '(818) 858-7301' },
    { usageType: 'DL', number: '(301) 444-5036' },
  ];

  run() {
    const { CommonLogin, CreateMock, Relogin, CheckComposeTextFromField } =
      this;
    return (
      <Scenario
        desc="Send text message from other number on compose text page"
        action={[
          CreateMock,
          <MockGetPhoneNumber
            getPhoneNumberData={(mockData: any) => ({
              ...mockData,
              records: this.senderNumbers.map((item) => {
                return {
                  id: new Date().getTime(),
                  phoneNumber: item.number,
                  paymentType: 'Local',
                  location: 'Galt, CA',
                  type: 'VoiceFax',
                  usageType: 'DirectNumber',
                  status: 'Normal',
                  country: {
                    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1',
                    id: '1',
                    name: 'United States',
                  },
                  features: ['SmsSender', 'CallerId', 'MmsSender'],
                };
              }),
            })}
          />,
          <MockPostSMS
            isDefaultInit
            handler={(mockData) => {
              mockData.from.phoneNumber = '(818) 858-7301';
              mockData.subject = 'test test 1234';
              return mockData;
            }}
          />,
        ]}
      >
        <Given
          desc="Login > Compose text"
          action={[CommonLogin, <NavigateTo path="/composeText" />]}
        />
        <When
          desc="Click dropdown list in sender field"
          action={ClickMessageFromField}
        />
        <Then desc="It should include all the DID & DL {Numbers} of the login number" />
        <And
          desc="Should see 'Direct(818) 982-3302' item in the dropdown list"
          action={() => {
            const element = screen.getAllByTestId('selectMenuItem', {
              exact: false,
            })[0];
            expect(element).toHaveTextContent('(818) 982-3302');
            expect(element).toHaveTextContent('Direct');
          }}
        />
        <And
          desc="Should see 'Direct(818) 858-7301' item in the dropdown list"
          action={() => {
            const element = screen.getAllByTestId('selectMenuItem', {
              exact: false,
            })[1];
            expect(element).toHaveTextContent('(818) 858-7301');
            expect(element).toHaveTextContent('Direct');
          }}
        />
        <And
          desc="Should see 'Direct(301) 444-5036' item in the dropdown list"
          action={() => {
            const element = screen.getAllByTestId('selectMenuItem', {
              exact: false,
            })[2];
            expect(element).toHaveTextContent('(301) 444-5036');
            expect(element).toHaveTextContent('Direct');
          }}
        />
        <When
          desc="Choose another number item '(818) 858-7301' from dropdown list"
          action={async () => {
            await userEvent.click(
              screen.getAllByTestId('selectMenuItem', { exact: false })[1],
            );
            await waitForRenderReady();
          }}
        />
        <Then
          desc="The number (818) 858-7301 should be shown on dropdown filed directly"
          action={CheckComposeTextFromField}
        />
        <When
          desc="> Enter a recipient(eg.+12054061600) on the 'To' field
                > Type some message 'test test 1234' on textarea"
          action={
            <InputSMS phoneNumber="+12054061600" textMessage="test test 1234" />
          }
        />
        <And
          desc="Click the send button"
          action={<ClickItemByDataSign dataSign="messageButton" />}
        />
        <Then
          desc="User should be able to go to conversation page"
          action={async () => {
            await whenStateChange(() => {
              expect(screen.getByTestId('conversationPanel')).toBeVisible();
            });
          }}
        />
        <And
          desc="Receiver receives the SMS successfully, the sender number should be DID_2 '(818) 858-7301'"
          action={
            ((props, { rcMock }) => {
              const [_, request] = rcMock.fetchMock.lastCall(
                new RegExp('.*/restapi/v1.0/account/~/extension/~/sms'),
                { method: 'post' },
              )!;
              const requestObj = JSON.parse(request?.body as string);
              expect(requestObj.from.phoneNumber).toBe('(818) 858-7301');
            }) as StepFunction
          }
        />
        <And
          desc="User should see text 'test test 1234' in the page"
          action={() => {
            const element = screen.getByTestId('OutboundText');
            expect(element).toHaveTextContent('test test 1234');
          }}
        />
        <When
          desc="Re-login CTI app with the same account, go to Compose text"
          action={[
            ((_, { rcMock }) => {
              rcMock.postAuthRevoke();
              rcMock.getFeatures();
              rcMock.getMessageSync();
              rcMock.getAddressBookSync();
              rcMock.getDialingPlan();
              rcMock.getPhoneNumber();
              rcMock.getAccount();
            }) as StepFunction,
            Relogin,
            <NavigateTo path="/composeText" />,
          ]}
        />
        <Then
          desc="The 'Send Message From' is DID_2 '(818) 858-7301'"
          action={CheckComposeTextFromField}
        />
      </Scenario>
    );
  }
}
