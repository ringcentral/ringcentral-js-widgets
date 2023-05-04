/**
 * RCI-4105: Call emergency when OPC enabled
 * https://test_id_domain/test-cases/RCI-4105
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * Set ' Outbound Call Prefix' to enable inadmin web
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User Set'Outbound Call Prefix' as9inSW
 * Emergency call number is 911
 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * Set ' Outbound Call Prefix' to enable inadmin web
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User Set'Outbound Call Prefix' as9inSW
 * Emergency call number is 911
 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 *
  | OCP |Dialing text |NPC Parsed |
  | 9 |911 |911 |
	| 9 |9911 |911 |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../../lib/step';
import {
  CheckCallControlPage as BaseCheckCallControlPage,
  MakeCall,
  MakeOutboundCall,
} from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { MockNumberParserV2, MockPermission } from '../../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@title('Call emergency when OPC enabled')
export class RCI4105 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;
  @examples(`
      | OCP | phoneNumber | parsedNumber |
      | '9' | '911'       | '911'        |
      | '9' | '9911'      | '911'        |
    `)
  run() {
    const { Login, CreateMock, CheckCallControlPage } = this;
    return (
      <Scenario
        desc="Call emergency when OPC enabled"
        action={[
          CreateMock,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter((feature) => {
                  return feature.id !== 'OutboundCallPrefix';
                })
                .concat([
                  {
                    id: 'OutboundCallPrefix',
                    available: true,
                    params: [
                      {
                        name: 'OutboundCallPrefix',
                        value: this.context.example.OCP,
                      },
                    ],
                  },
                ]);
              return permission;
            }}
          />,
          <MockNumberParserV2
            handler={(mockData) => {
              mockData.results[0].category = Category.SpecialService;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                national: this.context.example.parsedNumber,
              };
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />
        <When
          desc="> Navigate to dial page, input{dialing text} in 'To' filed,
										> Click call button"
          action={MakeOutboundCall}
        />
        <When
          desc="> Navigate to dial page, input{dialing text} in 'To' filed,
                      > Click call button"
          action={MakeCall}
        />
        <Then
          desc="Checked the dialing number on call control page is ${parsedNumber}"
          action={CheckCallControlPage}
        />
      </Scenario>
    );
  }
}
