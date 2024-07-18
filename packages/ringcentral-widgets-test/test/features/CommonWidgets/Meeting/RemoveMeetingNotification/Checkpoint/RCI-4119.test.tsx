/**
 * RCI-4119: Display remove meeting notification in meeting page
 * https://test_it_domain/test-cases/RCI-4119
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to 3rd party
 * User has logged in to {CTI} app with {Brand}
 * Entry point(/s):
 * Check the meeting page in {CTI} app with {Brand}
 *
  | Brand |Text |Link |
  | RC |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=1210 |
	| BT |BT Cloud Work Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=7710 |
	| TELUS | TELUS Business Connect for Google Workspace |https://www.ringcentral.com/apps/download?app=gsuite&brandId=7310 |
	| AT&T |AT&T Office@Hand for Google Workspace |https://www.ringcentral.com/apps/download?app=gsuite&brandId=3420 |
	| Avaya |Avaya Cloud Office Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=6010 |
	| Unify Office(Atos) |Unify Office Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2020 |
	| Rainbow Office |Rainbow Office Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2110 |
	| Verizon |RingCentral with Verizon Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2210 |
	| Vodafone |Vodafone Business Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=7010 |
	| Ecotel |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=4210 |
	| MCM |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=4810 |
	| Eastlink |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=4610 |
	| Versatel |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=4710 |
	| Frontier |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=4910 |
	| DT-RCO-Telekom |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2030 |
	| DT-RCO-ATOS-Unify Office Telekom |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2040 |
	| Sunrise |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=2050 |
	| Fedramp |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=1250 |
	| Charter SMB | RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=5110 |
	| Charter Enterprise |RingCentral Google Workspace Add-on |https://www.ringcentral.com/apps/download?app=gsuite&brandId=5210 |

 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=1210
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=7710
 * TELUS Business Connect for Google Workspace
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=7310
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=3420
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=6010
 * Unify Office(Atos)
 * Unify Office Google Workspace Add-on
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2020
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2110
 * RingCentral with Verizon Google Workspace Add-on
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2210
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=7010
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=4210
 * RingCentral Google Workspace Add-on
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=4810
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=4610
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=4710
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=4910
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2030
 * DT-RCO-ATOS-Unify Office Telekom
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2040
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=2050
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=1250
 * RingCentral Google Workspace Add-on
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=5110
 * https://www.ringcentral.com/apps/download?app=gsuite&brandId=5210
 */
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
  StepProp,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock, MockAccountInfo } from '../../../../../steps/Mock';
import { NavigateToMeeting } from '../../../../../steps/Navigate';

// not enable this feature in common
// TODO now the copy is different with RCINT-24629 need to update after confirmation
@autorun(test.skip)
@it
@p2
@title('Display remove meeting notification in meeting page')
export class RemoveMeetingNotification extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  CheckRemoveMeetingNotification: StepProp = () => ({});
  @examples(`
    | brandId | brand               | appName                                            |
    | '1210'  | 'rc'                | 'RingCentral Google Workspace Add-on'            |
  `)
  run() {
    const { CreateMock, Login, CheckRemoveMeetingNotification } = this;
    return (
      <Scenario desc="Display remove meeting notification in meeting page">
        <When
          desc="Direct to the entry point"
          action={[
            CreateMock,
            <MockAccountInfo
              handler={(mockData) => {
                mockData.serviceInfo.brand.id = this.example.brandId;
                return mockData;
              }}
            />,
            Login,
            NavigateToMeeting,
          ]}
        />
        <Then
          desc="Notification display at the top of the page:'Please switch to the{Text}to continue using the meeting feature.'
                {Text}should be a hyperlink
                [L10N]"
          action={CheckRemoveMeetingNotification}
        />
        <When desc="Click {Text}" />
        <Then desc="Should open new tab with {Link}" />
      </Scenario>
    );
  }
}
