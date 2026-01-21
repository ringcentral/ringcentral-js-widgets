/**
 * RCI-1589: Get Outbound Caller ID setting from SW
 * https://test_it_domain/test-cases/RCI-1589
 * Preconditions:
 * RC CTI app is installed and enabled
 * Entry point(/s):
 *
 */
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckFromFieldValue } from '../../../../../steps/Dialer';
import {
  CreateMock,
  MockPhoneNumber,
  MockCallerId,
} from '../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Get Outbound Caller ID setting from SW')
export class RCI1589 extends Step {
  Login: StepFunction<any, any>[] | StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;
  fromFieldDataSign?: string;
  @examples(`
    | callerId          | phoneNumber    | defaultFromNumber |
    | '+15202860016'    | '+15202860016' | '(520) 286-0016'  |
    | '+19075228319'    | '+19075228319' | '(907) 522-8319'  |
    `)
  // TODO: fix this unstable test, current location will not always be the same
  // | 'CurrentLocation' | '+19065228319' | '(906) 522-8319'  |
  run() {
    const { Login, CreateMock, fromFieldDataSign } = this;
    return (
      <Scenario desc="Get Outbound Caller ID setting from SW">
        <When
          desc="Set outbound caller id to {callerId} for 'RingOut from Web' in SW > My Extension > Settings > Outbound Calls/Faxes > Caller ID > By Feature, login RC for Google, select 'Browser in Setting > Calling, check 'From' field on 'Phone' tab"
          action={[
            CreateMock,
            <MockCallerId
              handler={(mockData) => {
                return {
                  ...mockData,
                  byFeature: mockData.byFeature
                    .filter((data) => data.feature !== 'RingOut')
                    .concat({
                      feature: 'RingOut',
                      callerId:
                        this.example.callerId === 'CurrentLocation'
                          ? { type: 'CurrentLocation' }
                          : {
                              type: 'PhoneNumber',
                              phoneInfo: {
                                uri: 'https://api-rcapps-labs_domain/restapi/v1.0/account/295090004/phone-number/353066004',
                                id: '353066004',
                                phoneNumber: this.example.callerId,
                              },
                            },
                    }),
                };
              }}
            />,
            <MockPhoneNumber
              isDefaultInit
              handler={(mockData) => {
                mockData.records[0].phoneNumber = this.example.phoneNumber;
                return mockData;
              }}
            />,
          ]}
        />
        <Given desc="login App" action={Login} />
        <Then
          desc="The default value is the same as 'RingOut from Web' in SW"
          action={[
            NavigateToDialer,
            <CheckFromFieldValue
              phoneNumber={this.example.defaultFromNumber}
              dataSign={fromFieldDataSign}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
