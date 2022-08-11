/**
 * RCI-4200: If selected country's countryCallingCode does not match the primary number's countryCalling Code, then area code value is null
 * https://test_id_domain/test-cases/RCI-4200
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * Set 'Smart Dial Plan Routing' to enable in SCP
 * User hasn't set 'Area Code'on the region setting page in CTI
 * User details are listed below
 * User set 'Country' as (+33)France on Region setting page in CTI
 *
  | User name |primaryNumber |mainCompanyNumber |Api-default area |Real area code |
  | Cassidy Chen |(205) 879-3409 |(403) 370-0051 |205 |null |

 *
  | countryCallingCode | Contrast |
  | +1 |primaryNumber:(205) 879-3409mainCompanyNumber:(403) 370-0051 |
	| +33 |'Country'setting in CTI |

 * Note:
 * SCP:(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * User log in to CTI app > Get {Api-default area}code fromnumber-parser/parse api
 */

import { waitUntilTo } from '@ringcentral-integration/utils';
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
  StepFunction,
  StepProp,
} from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  MockNumberParserV2,
  MockPhoneNumber,
  MockDialingPlan,
} from '../../../../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@title(
  "If selected country's countryCallingCode does not match the primary number's countryCalling Code, then area code value is null",
)
export class SelectedCountryCallingCode extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;

  @examples(`
      | countryName      | selectedCountryCallingCode | primaryNumber       | primaryNumberAreaCode | mainCompanyNumber   | mainCompanyNumberAreaCode | expectAccountAreaCode |
      | 'United Kingdom' | '44'                       | '+44(205) 879-3409' | '205'                 | '+44(403) 370-0051' | '403'                     | null                  |
    `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="If selected country's countryCallingCode does not match the primary number's countryCalling Code"
        action={[
          CreateMock,
          <MockPhoneNumber
            isDefaultInit
            handler={(mockData) => {
              mockData.records[0] = {
                ...mockData.records[0],
                phoneNumber: this.context.example.primaryNumber,
                primary: true,
                usageType: 'DirectNumber',
              };
              mockData.records[1] = {
                ...mockData.records[1],
                phoneNumber: this.context.example.mainCompanyNumber,
                primary: false,
                usageType: 'MainCompanyNumber',
              };
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
          <MockDialingPlan
            handler={(mockData) => {
              const selectedCountryCallingCode =
                this.context.example.selectedCountryCallingCode;
              const plan = mockData.find(
                (plan) => plan.id === selectedCountryCallingCode,
              );
              if (!plan) {
                mockData.push({
                  uri: `https://platform.ringcentral.com/restapi/v1.0/dictionary/country/${selectedCountryCallingCode}`,
                  id: selectedCountryCallingCode,
                  name: this.context.example.countryName,
                  callingCode: selectedCountryCallingCode,
                  isoCode: 'MockISOCode',
                });
              }
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="> Login in the CTI" action={Login} />
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
            expect(phone.regionSettings.defaultAreaCode).toBe(
              this.context.example.expectAccountAreaCode,
            );
          }}
        />
      </Scenario>
    );
  }
}
