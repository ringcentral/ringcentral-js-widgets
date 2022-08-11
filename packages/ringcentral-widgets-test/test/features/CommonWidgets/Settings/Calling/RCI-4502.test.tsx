import { Context } from '../../../../interfaces';
import {
  And,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
  common,
} from '../../../../lib/step';
import { ClickItemByDataSign } from '../../../../steps/Common';
import { MockAccountInfo, MockGetPhoneNumber } from '../../../../steps/Mock';
import { NavigateToCallingSetting } from '../../../../steps/Navigate';
import { CheckCallWithSoftphoneOptionDisplay } from '../../../../steps/Settings';

@autorun(test.skip)
@common
@title(
  'Verify ${brandName} brand call with softphone option on calling settings',
)
export class CheckCallWithSoftphoneOption extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | brandId | brandName   | spartanName                    | showSoftphoneOption |
    | '1210'  | 'rc'        | 'RingCentral Phone'            | true                |
    | '3420'  | 'att'       | 'AT&T Office@Hand Phone'       | true                |
    | '7710'  | 'bt'        | 'BT Cloud Work Phone'          | true                |
    | '7310'  | 'telus'     | 'TELUS Business Connect Phone' | true                |
    | '6010'  | 'avaya'     | 'N.A.'                         | false               |
    | '2020'  | 'atos'      | 'Unify Office Phone'           | true                |
    | '2110'  | 'rainbow'   | 'Rainbow Office Phone'         | true                |
    | '2210'  | 'verizon'   | 'RingCentral Phone'            | true                |
    | '7010'  | 'vodafone'  | 'RingCentral Phone'            | true                |
    | '4210'  | 'ecotel'    | 'N.A.'                         | false               |
    | '4810'  | 'mcm'       | 'N.A.'                         | false               |
    | '4610'  | 'eastlink'  | 'N.A.'                         | false               |
    | '4710'  | 'versatel'  | 'N.A.'                         | false               |
    | '4910'  | 'frontier'  | 'N.A.'                         | false               |
    | '2030'  | 'dttelekom' | 'N.A.'                         | false               |
    | '2040'  | 'dtatos'    | 'N.A.'                         | false               |
    | '2050'  | 'sunrise'   | 'N.A.'                         | false               |
  `)
  run() {
    return (
      <Scenario
        desc="Verify ${brandName} brand call with softphone option on calling settings"
        action={[
          this.CustomCreateMock,
          ({ brandId }: { brandId: string }) => (
            <MockAccountInfo
              handler={(mockData) => {
                mockData.serviceInfo.brand.id = brandId;
                return mockData;
              }}
            />
          ),
          MockGetPhoneNumber,
        ]}
      >
        <Given
          desc="User is logged into 3rd party and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Direct to Settings -> Calling page"
          action={NavigateToCallingSetting}
        />
        <And
          desc="Click 'call with' select dropdown"
          action={<ClickItemByDataSign dataSign="selectRoot" />}
        />
        <Then
          desc="Check call with softphone option display"
          action={(
            { spartanName, showSoftphoneOption }: any,
            { phone }: Context,
          ) => {
            // The phone option may not be displayed due to other factors.
            // Need to check isDisableSpartan as well
            expect(phone.brand.brandConfig.isDisableSpartan).toBe(
              !showSoftphoneOption,
            );
            if (showSoftphoneOption) {
              expect(phone.brand.brandConfig.callWithSoftphone?.name).toBe(
                spartanName,
              );
            }

            // Check UI
            return (
              <CheckCallWithSoftphoneOptionDisplay
                show={showSoftphoneOption}
                spartanName={spartanName}
              />
            );
          }}
        />
      </Scenario>
    );
  }
}
