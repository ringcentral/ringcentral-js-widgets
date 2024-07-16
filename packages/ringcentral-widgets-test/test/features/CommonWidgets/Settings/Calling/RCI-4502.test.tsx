import type { Context } from '../../../../interfaces';
import type { StepFunction } from '../../../../lib/step';
import {
  And,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
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
@title(
  'Verify ${brandName} brand call with softphone option on calling settings',
)
@common
export class CheckCallWithSoftphoneOption extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | brandId | subBrandId         | brandName   | spartanName                    | showSoftphoneOption |
    | '1210'  | undefined          | 'rc'        | 'RingCentral Phone'            | true                |
    | '3420'  | undefined          | 'att'       | 'AT&T Office@Hand Phone'       | true                |
    | '7710'  | undefined          | 'bt'        | 'BT Cloud Work Phone'          | true                |
    | '7310'  | undefined          | 'telus'     | 'TELUS Business Connect Phone' | true                |
    | '6010'  | undefined          | 'avaya'     | 'Avaya Cloud Office Phone'     | true                |
    | '2020'  | undefined          | 'atos'      | 'Unify Office Phone'           | true                |
    | '2110'  | undefined          | 'rainbow'   | 'Rainbow Office Phone'         | true                |
    | '2210'  | undefined          | 'verizon'   | 'RingCentral Phone'            | true                |
    | '7010'  | undefined          | 'vodafone'  | 'RingCentral Phone'            | true                |
    | '4210'  | undefined          | 'ecotel'    | 'N.A.'                         | false               |
    | '4810'  | undefined          | 'mcm'       | 'N.A.'                         | false               |
    | '4610'  | undefined          | 'eastlink'  | 'N.A.'                         | false               |
    | '4710'  | undefined          | 'versatel'  | 'N.A.'                         | false               |
    | '4910'  | undefined          | 'frontier'  | 'N.A.'                         | false               |
    | '2030'  | undefined          | 'dttelekom' | 'N.A.'                         | false               |
    | '2040'  | undefined          | 'dtatos'    | 'N.A.'                         | false               |
    | '2050'  | undefined          | 'sunrise'   | 'N.A.'                         | false               |
    | '2000'  | '2000.Optus'       | 'sunrise'   | 'N.A.'                         | false               |
    | '3000'  | '3000.Brightspeed' | 'sunrise'   | 'N.A.'                         | false               |
    | '3000'  | '3000.NWNC'        | 'sunrise'   | 'N.A.'                         | false               |
    | '3000'  | '3000.Zayo'        | 'sunrise'   | 'N.A.'                         | false               |
  `)
  run() {
    return (
      <Scenario
        desc="Verify ${brandName} brand call with softphone option on calling settings"
        action={[
          this.CustomCreateMock,
          ({
            brandId,
            subBrandId,
          }: {
            brandId: string;
            subBrandId: string;
          }) => (
            <MockAccountInfo
              handler={(mockData) => {
                mockData.serviceInfo.brand.id = brandId;
                if (subBrandId !== undefined) {
                  mockData.serviceInfo.uBrand = {
                    id: subBrandId,
                  };
                }
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
