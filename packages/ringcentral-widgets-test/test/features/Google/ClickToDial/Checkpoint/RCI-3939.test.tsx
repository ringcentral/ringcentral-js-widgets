/**
 * RCI-3939: Click to Dial in different websites
 * https://test_it_domain/test-cases/RCI-3939
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import {
  p2,
  it,
  And,
  autorun,
  examples,
  Given,
  StepProp,
  common,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckActiveCallExist } from '../../../../steps/Call';
import { TurnOnToggle } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateToSettings } from '../../../../steps/Navigate';

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

// not enable c2d in common
@autorun(test.skip)
@it
@p2
@title('Click to Dial in different websites')
@common
export class C2DInWebsites extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  CheckC2DIsVisibleThenClick: StepProp = () => ({});
  @examples(`
    | elementType | content        | attrName  | attrValue             | phoneNumber    |
    | 'div'       | '+16501234567' | undefined | undefined             | '+16501234567' |
    | 'a'         | 'test'         | 'href'    | 'tel:+16501234567'    | '+16501234567' |
    | 'a'         | 'test'         | 'href'    | 'callto:+16501234567' | '+16501234567' |
    | 'a'         | 'test'         | 'href'    | 'sms:+16501234567'    | '+16501234567' |
  `)
  run() {
    const { CreateMock, Login, CheckC2DIsVisibleThenClick } = this;
    return (
      <Scenario desc="Click to Dial in different websites">
        <Given desc="Direct to the entry point" action={[CreateMock, Login]} />
        <And
          desc="Turn on the 'Click to Dial/SMS' toggle in 'Settings' tab"
          action={[
            NavigateToSettings,
            <TurnOnToggle dataSign="switchClickToDialSMS" />,
          ]}
        />
        <When
          desc="Check phone numbers of below doms:
          div
          href='tel:+16501234567'
          href='callto:+16501234567'
          href='sms:+16501234567'"
        />
        <Then
          desc="Phone numbers of click to dial should be detected
								'Click to Dial' button should display correctly"
          action={CheckC2DIsVisibleThenClick}
        />
        <When desc="Click dial icon" />
        <Then
          desc="The CTI app should be brought to front or initiate an outbound call to the clicked phone number"
          action={CheckActiveCallExist}
        />
      </Scenario>
    );
  }
}
