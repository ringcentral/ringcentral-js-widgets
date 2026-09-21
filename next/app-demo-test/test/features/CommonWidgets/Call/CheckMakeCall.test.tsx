import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  screen,
} from '@ringcentral-integration/test-utils';
import { MakeOutboundCall } from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateMock, MockAccountInfo } from '../../../steps/Mock';

@autorun(test)
@common
@it
@title('Check NumberValidate parseNumbers when no service brand info')
export class CheckMakeCallWhenNoServiceBrandInfo extends Step {
  run() {
    return (
      <Scenario
        desc="Check NumberValidate parseNumbers when no service brand info"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.serviceInfo.brand = undefined;
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login in the CTI" action={CommonLogin} />
        <When
          desc="Make outbound call"
          action={<MakeOutboundCall phoneNumber="+16505819954" />}
        />
        <Then
          desc="Could make the call successfully"
          action={async () => {
            await whenStateChange(() => {
              expect(screen.getByTestId('activeCallPanel')).toBeVisible();
            });
          }}
        />
      </Scenario>
    );
  }
}
