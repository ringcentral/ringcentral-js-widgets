import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { ClickItemByDataSign } from '../../../../steps/Common';
import { MockGetPhoneNumber } from '../../../../steps/Mock';
import { NavigateToCallingSetting } from '../../../../steps/Navigate';
import { CheckCallWithSoftphoneOptionDisplay } from '../../../../steps/Settings';

@autorun(test.skip)
@title(
  'Verify ${brandName} brand call with softphone option on calling settings should works',
)
@common
export class CheckCallWithSoftphoneOption extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | brandId | brandName   | spartanName                    | showSoftphoneOption |
    | '1210'  | 'rc'        | 'RingCentral Phone'            | true                |
    | '2050'  | 'sunrise'   | 'N.A.'                         | false               |
  `)
  run() {
    return (
      <Scenario
        desc="Verify ${brandName} brand call with softphone option on calling settings"
        action={[this.CustomCreateMock, MockGetPhoneNumber]}
      >
        <Given
          desc="User is logged into 3rd party and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Mock idb softphone config settings"
          action={[
            (async ({ spartanName, showSoftphoneOption }: any, { app }) => {
              const brand = app.container.got(Brand)!;
              await brand.setDynamicConfig({
                ...brand.defaultConfig,
                isDisableSpartan: !showSoftphoneOption,
                callWithSoftphone: {
                  name: spartanName,
                  protocol: 'some://link',
                },
              });
            }) as StepFunction,
            WaitForRenderReady,
          ]}
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
          action={
            (({ spartanName, showSoftphoneOption }: any) => {
              return (
                <CheckCallWithSoftphoneOptionDisplay
                  show={showSoftphoneOption}
                  spartanName={spartanName}
                />
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
