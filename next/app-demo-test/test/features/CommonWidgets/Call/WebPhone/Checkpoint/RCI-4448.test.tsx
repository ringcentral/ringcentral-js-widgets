/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * RCI-4448: The non-provisioned forwarded number can not be presented in the list of caller
 * https://test_it_domain/test-cases/RCI-4448
 * Preconditions:
 * User has logged into RC CTI App
 * User has created a non-provisioned forwarded number on SW
 * User has aprovisioned forwarded numberonSW
 *
  | Non-provisioned forwarded number |Provisioned forwarded number |
  | (209) 759-7777 |(209) 444-9999 |

 * Note:
 * Created a non-provisioned number: Add a number through SW > Phone System >Phone Numbers > All Numbers >Three dots menu >Add substitute caller ID/forwarded number
 * Provisioned forwarded number: Hasparameter: features: ['CallerId']
 * Entry point(/s):
 * Open CTI > Navigate todial page
 */
import {
  autorun,
  common,
  examples,
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
import {
  CheckProvisionedCallerId,
  ClickFromField,
} from '../../../../../steps/Dialer';
import { CreateMock, MockPhoneNumber } from '../../../../../steps/Mock';

@autorun(test)
@it
@p2
@common
@title(
  'The non-provisioned forwarded number can not be presented in the list of caller',
)
export class RCI4448 extends Step {
  Login: StepFunction<any, any>[] | StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples(`
    | nonProvisionedE164 | nonProvisionedFormatted | provisionedE164 | provisionedFormatted |
    | '+12097597777'     | '(209) 759-7777'        | '+12094449999'  | '(209) 444-9999'     |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="The non-provisioned forwarded number can not be presented in the list of caller"
        action={({ nonProvisionedE164, provisionedE164 }: any) => [
          CreateMock,
          <MockPhoneNumber
            isDefaultInit
            handler={(mockData) => {
              mockData.records[0].usageType = 'MainCompanyNumber';
              const nonProvisionedNumber = {
                ...mockData.records[0],
                features: [],
                phoneNumber: nonProvisionedE164,
                primary: false,
                usageType: 'ForwardedCompanyNumber',
              };
              const provisionedNumber = {
                ...mockData.records[0],
                features: ['CallerId'],
                phoneNumber: provisionedE164,
                primary: false,
                usageType: 'ForwardedCompanyNumber',
              };
              // @ts-ignore
              mockData.records.unshift(nonProvisionedNumber, provisionedNumber);
              return mockData;
            }}
          />,
        ]}
      >
        <When desc="> Login in the CTI" action={Login} />
        <When
          desc="Click the drop-down list 'From' filed"
          action={ClickFromField}
        />
        <Then
          desc="Provisioned forwarded number is on thecaller ids list
										Non-provisioned forwarded numberis not on thecaller ids list"
          action={async ({
            nonProvisionedFormatted,
            provisionedFormatted,
          }: any) => (
            <CheckProvisionedCallerId
              noProvisioned={nonProvisionedFormatted}
              provisioned={provisionedFormatted}
            />
          )}
        />
      </Scenario>
    );
  }
}
