/**
 * RCI-4107: OCP with site code
 * https://test_it_domain/test-cases/RCI-4107
 * Preconditions:
 * CTI app is integrated
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * Set ' Outbound Call Prefix' to enable inadmin web
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has multiple sites
 * User has 'Max extension number length' as 7digits
 * User has default area code as 30
 * User Set'Outbound Call Prefix' as{OCP}inSW
 * Have additional information below
 *
  | Site |Extension numbers/name |PSTN numbers |
  | 22(Company- own site) |2230003/Lexie Lin |+1302230003 |
	| 24 |2430003/Frida Deng |+1302230004 |

 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Navigate to dial page >Input{originalStrings}in 'To' filed> Click call button
 * Navigate to compose text page > Input{originalStrings}in 'To' filed >> Input test text in text box > Click send button
 *
  | OCP |Dialing text |Parsed number |Name |
  | 7 |2230003 |30003 |Lexie Lin |
	| 7 |30003 |30003 |Lexie Lin |
	| 7 |2430003 |2430003 |Frida Deng |
	| null |2430003 |2430003 |Frida Deng |
	| 7 |72230003 |(30) 223-0003 |- |

 * Entry point(/s):
 * CTI app is integrated
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * Set ' Outbound Call Prefix' to enable inadmin web
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has multiple sites
 * User has 'Max extension number length' as 7digits
 * User has default area code as 30
 * User Set'Outbound Call Prefix' as{OCP}inSW
 * Have additional information below
 *
  | Site |Extension numbers/name |PSTN numbers |
  | 22(Company- own site) |2230003/Lexie Lin |+1302230003 |
	| 24 |2430003/Frida Deng |+1302230004 |

 * Note:
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Navigate to dial page >Input{originalStrings}in 'To' filed> Click call button
 * Navigate to compose text page > Input{originalStrings}in 'To' filed >> Input test text in text box > Click send button
 *
  | OCP |Dialing text |Parsed number |Name |
  | 7 |2230003 |30003 |Lexie Lin |
	| 7 |30003 |30003 |Lexie Lin |
	| 7 |2430003 |2430003 |Frida Deng |
	| null |2430003 |2430003 |Frida Deng |
	| 7 |72230003 |(30) 223-0003 |- |

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

import type { StepProp } from '../../../../lib/step';
import { CheckCallControlPage, MakeOutboundCall } from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import {
  generateCallLogData,
  MockAccountInfo,
  MockCallLogs,
  MockCallLogSync,
  MockExtensionInfo,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
  MockPermission,
  MockPresence,
} from '../../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@title('OCP with site code with OCP ${OCP} and phone number ${phoneNumber} ')
export class RCI4107 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  @examples(`
      | OCP  | phoneNumber | parsedNumber     | name      | Category                |
      | '7'  | '2230003'   | '30003'          | 'UserA'   | '${Category.Extension}' |
      | '7'  | '30003'     | '30003'          | 'UserA'   | '${Category.Extension}' |
      | '7'  | '2430003'   | '2430003'        | 'UserB'   | '${Category.Extension}' |
      | null | '2430003'   | '2430003'        | 'UserB'   | '${Category.Extension}' |
      | '7'  | '72230003'  | '(650) 223-0003' | 'Unknown' | '${Category.Regular}'   |
    `)
  run() {
    const isExtension = this.context.example.Category === Category.Extension;
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="OCP with site code"
        action={({ OCP, phoneNumber, parsedNumber, name, Category }: any) => {
          const actions = [
            CreateMock,
            <MockPermission
              handler={(features) => {
                return features
                  .filter(
                    (feature) =>
                      feature.id !== 'OutboundCallPrefix' &&
                      feature.id !== 'SiteCodes',
                  )
                  .concat([
                    {
                      id: 'OutboundCallPrefix',
                      available: true,
                      params: [
                        {
                          name: 'OutboundCallPrefix',
                          value: OCP,
                        },
                      ],
                    },
                    {
                      id: 'SiteCodes',
                      available: true,
                    },
                  ]);
              }}
            />,
            <MockAccountInfo
              handler={(mockData) => {
                mockData.limits.maxExtensionNumberLength = 7;
                return mockData;
              }}
            />,
            <MockExtensionInfo
              handle={(extensionInfo) => {
                extensionInfo.site = {
                  code: '22',
                  id: '',
                  uri: '',
                  name: 'site1',
                };
                return extensionInfo;
              }}
            />,
            <MockPresence repeat={3} />,
            <MockNumberParserV2
              isDefaultInit
              handler={(mockData) => {
                mockData.results[0].category = this.context.example.Category;
                const { parsedNumber } = this.context.example;
                if (isExtension) {
                  mockData.results[0].numberDetails.extensionNumber =
                    parsedNumber;
                } else {
                  mockData.results[0].formats[0] = {
                    ...mockData.results[0].formats[0],
                    e164Extended: this.context.example.parsedNumber,
                  };
                }
                return mockData;
              }}
            />,
          ];
          if (isExtension) {
            actions.push(
              <MockExtensionsList
                handler={(mockData) => ({
                  ...mockData,
                  ...mockExtensionsListData({
                    ...(!isExtension ? { phoneNumber } : {}),
                    ...(isExtension ? { extensionNumber: phoneNumber } : {}),
                    phoneNumberUsageType: 'ContactNumber',
                    firstName: name,
                    lastName: '',
                    phoneNumberHidden: false,
                  }),
                })}
              />,
              <MockMessageSync repeat={5} />,
              <MockCallLogSync
                mockResponse={generateCallLogData({
                  direction: 'Outbound',
                  toNumber: phoneNumber,
                  toName: `${name}`,
                })}
              />,
              <MockCallLogs isDefaultInit repeat={10} />,
            );
          }
          return actions;
        }}
      >
        <Given desc="Login APP" action={Login} />
        <When
          desc="Check the number on navigated page is{parsedNumber}
                      Show contact name as {Name}"
          action={[MakeOutboundCall]}
        />
        <Then
          desc="Checked the dialing number on call control page is ${parsedNumber}"
          action={[CheckCallControlPage]}
        />
      </Scenario>
    );
  }
}
