/**
 * RCI-6871: No MMS permission
 * https://test_it_domain/test-cases/RCI-6871
 * Preconditions:
 * User has logged into the 3rd party
 * CTI app is integrated.
 * The login account only has SMS permission
 * Entry point(/s):
 * > Login CTI app with the {Accounts}
 * > Go to the 'Messages' tab
 * > Click the 'Compose Text' icon
 */
import {
  p3,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepProp,
  screen,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { ClickItemByDataSign } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockCallLogSync,
  MockFeaturePermission,
  MockMessageList,
  MockMessagePut,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToHistory,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';
import { InputToField } from '../../../../../../steps/dialer';

@autorun(test.skip)
@it
@p3
@common
@title('No MMS permission')
export class NoMMSPermission extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      Entry: () => (
        <>
          <NavigateToMessagesTab />
          <ClickItemByDataSign dataSign="msgDetail" index={0} />
        </>
      ),
    },
    {
      Entry: () => (
        <>
          <NavigateToComposeText />
          <InputToField input="+18662100000" needEnter />
        </>
      ),
    },
    {
      Entry: () => (
        <>
          <NavigateToHistory />
          <ClickItemByDataSign dataSign="extendButton" />
          <ClickItemByDataSign dataSign="clickToSms" />
        </>
      ),
    },
  ])
  run() {
    return (
      <Scenario desc="No MMS permission">
        <When
          desc="> Go to entry points"
          action={[
            this.CreateMock,
            <MockFeaturePermission featureId="MMSSending" available={false} />,
            <MockMessagePut repeat={0} />,
            <MockMessageList
              repeat={0}
              handler={(mockData) => ({ ...mockData, record: [] })}
            />,
            <MockMessageSync
              repeat={1}
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    id: 3628750004,
                    direction: 'Outbound',
                    toNumber: '+18662100000',
                    conversationId: 1699508180182,
                    conversation: {
                      id: 1699508180182,
                      uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/1699508180182',
                    },
                  },
                ]),
              })}
            />,
            <MockCallLogSync
              mockResponse={GenerateCallHistory({ length: 1 })}
              isDefaultInit
              repeat={1}
            />,
            this.Login,
            this.example.Entry,
          ]}
        />
        <Then
          desc="There is no attach icon"
          action={() => {
            expect(
              screen.queryByTestId('attachButton'),
            ).not.toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
