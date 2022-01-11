import {
  autorun,
  Scenario,
  Step,
  title,
  When,
  Given,
  StepFunction,
  examples,
  Then,
} from '@ringcentral-integration/test-utils';
import { PresenceSetting } from '@ringcentral-integration/widgets/test/components/PresenceSettingSection/PresenceSettingSection';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { Login } from '../../steps/Login';

const NavigateTo: StepFunction<{ path: string }> = ({ path }, { phone }) => {
  phone.routerInteraction.push(path);
};

const responseMap = {
  Available: {},
  Busy: {
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Busy',
  },
  'Do not Disturb': {
    dndStatus: 'DoNotAcceptAnyCalls',
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Busy',
  },
  Invisible: {
    dndStatus: 'TakeAllCalls',
    pickUpCallsOnHold: false,
    presenceStatus: 'Offline',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Offline',
  },
} as const;

type PresenceDropdownCheckProps = {
  state: keyof typeof responseMap;
};

@autorun(test)
@title('Check presence setting section')
export class CheckInitialData extends Step {
  @examples(`
    | presenceListIndex |
    | 0                 |
    | 1                 |
    | 2                 |
    | 3                 |
  `)
  run() {
    return (
      <Scenario desc="Check presence setting section module">
        <Given desc="User is logged in" action={Login} />
        <When
          desc="App navigate to calling setting page"
          action={() => <NavigateTo path="/settings" />}
        />
        <Then
          desc="Mock available presence"
          action={({ state }: PresenceDropdownCheckProps) => {
            mock.presenceUpdate('~', responseMap[state]);
          }}
        />
        <When desc="Check presence setting section" action={PresenceSetting} />
      </Scenario>
    );
  }
}
