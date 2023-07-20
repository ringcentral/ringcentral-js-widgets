/**
 * RCI-4153: How to get default area code from api
 * https://test_it_domain/test-cases/RCI-4153
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User hasn't set 'Area Code'on the region setting page in CTI
 * The countryCallingCode 'svalue on region setting page is same as theprimaryNumber/mainCompanyNumber
 * User details are listed below
 *
  | User name |primaryNumber |mainCompanyNumber |
  | Cassidy Chen |(205) 879-3409 |(403) 370-0051 |

 * Note:
 * SCP:(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * countryCallingCode: The country for your region can set on region setting page,countryCallingCode in primaryNumber/mainCompanyNumber can be parsed.
 * Entry point(/s):
 * Open background.html of CTI > User log in to CTI app
 */

import { waitUntilTo } from '@ringcentral-integration/utils';
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import type { StepProp } from '../../../../../../lib/step';
import { StepFunction } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  MockExtensionInfo,
  MockNumberParserV2,
  MockPhoneNumber,
} from '../../../../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@title('How to get default area code from api')
export class DefaultAreaCode extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
    | primaryNumber        | primaryNumberAreaCode | mainCompanyNumber    | mainCompanyNumberAreaCode | expectAccountAreaCode |
    | '+33 (205) 879-3409' | '205'                 | '+33 (403) 370-0051' | '403'                     | '205'                 |
    | '+33 3333 4444'      | null                  | '+33 4444 5555'      | null                      | null                  |
    | '+33 3333 4444'      | null                  | '+33 (403) 370-0051' | '403'                     | '403'                 |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="How to get default area code from api"
        action={[
          CreateMock,
          <MockPhoneNumber
            isDefaultInit
            handler={(mockData) => {
              const mainCompanyNumber = {
                ...mockData.records[0],
                phoneNumber: this.context.example.mainCompanyNumber,
                primary: false,
                country: {
                  ...mockData.records[1].country,
                  id: '1',
                },
                usageType: 'MainCompanyNumber',
              };
              if (this.context.example.primaryNumber) {
                const primaryNumber = {
                  ...mockData.records[0],
                  phoneNumber: this.context.example.primaryNumber,
                  primary: true,
                  country: {
                    ...mockData.records[0].country,
                    id: '1',
                  },
                  usageType: 'DirectNumber',
                };
                mockData.records.unshift(primaryNumber, mainCompanyNumber);
              } else {
                mockData.records = mockData.records.map(
                  (item: typeof mockData.records) => {
                    item.primary = false;
                    return item;
                  },
                );
                mockData.records.unshift(mainCompanyNumber);
              }
              return mockData;
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
            handler={(mockData) => {
              mockData.results[0].numberDetails.areaCode =
                this.context.example.primaryNumberAreaCode;
              mockData.results[1].numberDetails.areaCode =
                this.context.example.mainCompanyNumberAreaCode;
              return mockData;
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry = {
                uri: 'https://api-rcapps-xmnup.rclabenv.com/restapi/v1.0/dictionary/country/75',
                id: '75',
                name: 'France',
                isoCode: 'FR',
                callingCode: '33',
              };
              return mockData;
            }}
          />,
        ]}
      >
        <When desc="> Login in the CTI" action={[Login]} />
        <Then
          desc="Passed parameters include {primaryNumber} and {mainCompanyNumber}
                      Get Area code from response
                      Note:
                      Due to the different countries and regions set by the account, the parsedArea codewill also be different.
                      Some countries do not have Area code and will not have this return value"
          action={async (_, { phone }) => {
            await waitUntilTo(() => {
              expect(phone.extensionPhoneNumber.ready).toBeTruthy();
            });
            expect(phone.regionSettings.defaultAreaCode ?? null).toBe(
              this.context.example.expectAccountAreaCode,
            );
          }}
        />
      </Scenario>
    );
  }
}
