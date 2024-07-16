/**
 * RCI-4053: Should not recognize the meeting id as a phone number
 * https://test_it_domain/test-cases/RCI-4053
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * Settings > Turnonthe'Click to Dial/SMS'
 * Entry point(/s):
 *
  | Meeting link |
  | meetings.ringcentral.com/j/1481234567 |
	| http://meetings.ringcentral.com/j/1481234567 |
	| https://meetings.ringcentral.com/j/1481234567 |
	| zoom.us/j/1491234567 |
	| https://meetings-officeathand.att.com/j/1491234567 |
	| https://meetings.btcloudphone.bt.com/j/1491234567 |
	| meetings.businessconnect.telus.com/j/1491234567 |
	| meetings.ringcentral.com/join?mid=1491234567 |
	| \\https://meetings.businessconnect.telus.com/join?mid=1491234567\\ |
	| http://v.ringcentral.com/join/148123456 |
	| http://meetings.officeathand.att.com/join/148123456 |
	| http://xmnup-rxe-1-v.lab.nordigy.ru/join/347121338 |

 */
import {
  p2,
  it,
  Given,
  autorun,
  examples,
  StepProp,
  Scenario,
  Step,
  title,
  common,
  When,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { TurnOnToggle } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock, MockGetPhoneNumber } from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';

jest.mock(
  'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
  () => {
    const { HoverRangeMatch: BaseHoverRangeMatch } = jest.requireActual(
      'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
    );
    class HoverRangeMatch extends BaseHoverRangeMatch {
      // mock mouse is hover on rect
      isMatch() {
        return true;
      }
    }
    return {
      __esModule: true,
      ...jest.requireActual(
        'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
      ),
      HoverRangeMatch,
    };
  },
);

window.Range.prototype.getBoundingClientRect = jest.fn(
  () =>
    ({
      bottom: 196,
      height: 23,
      left: 139.1328125,
      right: 283.15625,
      top: 173,
      width: 144.0234375,
      x: 139.1328125,
      y: 173,
    } as DOMRect),
);

@autorun(test.skip)
@it
@p2
@title('Should not recognize the meeting id as a phone number')
@common
export class NotEnableC2DForMeetingId extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  CheckC2DHiddenInMeetingLink: StepProp = () => ({});
  @examples([
    {
      meetingLink: 'meetings.ringcentral.com/j/1481234567',
    },
    {
      meetingLink: 'http://meetings.ringcentral.com/j/1481234567',
    },
    {
      meetingLink: 'https://meetings.ringcentral.com/j/1481234567',
    },
    {
      meetingLink: 'zoom.us/j/1491234567',
    },
    {
      meetingLink: 'https://meetings-officeathand.att.com/j/1491234567',
    },
    {
      meetingLink: 'https://meetings.btcloudphone.bt.com/j/1491234567',
    },
    {
      meetingLink: 'meetings.businessconnect.telus.com/j/1491234567',
    },
    {
      meetingLink: 'meetings.ringcentral.com/join?mid=1491234567',
    },
    {
      meetingLink:
        'https://meetings.businessconnect.telus.com/join?mid=1491234567',
      prefix: '\n\n',
      suffix: '\n\n',
    },
    {
      meetingLink: 'http://v.ringcentral.com/join/148123456',
    },
    {
      meetingLink: 'http://meetings.officeathand.att.com/join/148123456',
    },
    {
      meetingLink: 'http://xmnup-rxe-1-v.lab.nordigy.ru/join/347121338',
    },
  ])
  run() {
    const { CreateMock, Login, CheckC2DHiddenInMeetingLink } = this;
    return (
      <Scenario
        desc="Should not recognize the meeting id as a phone number"
        action={[CreateMock, MockGetPhoneNumber]}
      >
        <Given
          desc="Go to entry point"
          action={[
            Login,
            NavigateToSettings,
            <TurnOnToggle dataSign="switchClickToDialSMS" />,
            WaitForRenderReady,
          ]}
        />
        <When
          desc="> Go to any website (not in block lists) with {Meeting link}
                > Mouse hover the numbers of{Meeting link}
                > Wait for 5 seconds
                There should not have any icons display"
          action={CheckC2DHiddenInMeetingLink}
        />
      </Scenario>
    );
  }
}
