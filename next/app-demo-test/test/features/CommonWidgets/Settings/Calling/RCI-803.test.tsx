/**
 * RCI-803: Calling settings(Tooltips)
 * https://test_it_domain/test-cases/RCI-803
 * Preconditions:
 * 1. User is logged into 3rd party
 * 2. User has installed and logged into CTI app
 * RC: RingCentral Phone
 * AT&T: Office@Hand Phone
 * BT: -BT Cloud Work
 * TELUS: TELUS Business Connect™ Phone
 * Entry point(/s):
 *
 */
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p2,
  title,
  type Context,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { Entry } from '../../../../steps/Entry';
import { Login as CommonLogin } from '../../../../steps/Login';
import { NavigateTo } from '../../../../steps/Router';
import {
  CheckCallSettingPage,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../steps/Settings';

interface ExampleItem {
  brand: string;
  jupiterAppName: string;
  softphoneAppName: string;
}

@autorun(test)
@it
@p2
@title('Calling settings(Tooltips)')
@common
export class CheckCallingSettingsTooltip extends Step {
  Login?: StepFunction<any, any>;

  @examples(`
    | brand   | jupiterAppName               | softphoneAppName               |
    | 'rc'    | 'RingCentral App'            | 'RingCentral Phone'            |
  `)
  run() {
    const { Login = () => [Entry, CommonLogin] } = this;
    return (
      <Scenario desc="Calling settings(Tooltips)">
        <Given desc="Create phone instance and login" action={Login} />
        <And
          desc="Mock brand config"
          action={async (
            { jupiterAppName, softphoneAppName }: ExampleItem,
            { app }: Context,
          ) => {
            // Set locale to en-US
            const locale = app.container.got(Locale)!;
            await locale.setLocale('en-US');
            // Mock names
            const brand = app.container.got(Brand)!;
            brand.setDynamicConfig({
              ...brand.brandConfig,
              callWithJupiter: {
                ...brand.brandConfig.callWithJupiter,
                name: jupiterAppName,
              },
              callWithSoftphone: {
                ...brand.brandConfig.callWithSoftphone,
                name: softphoneAppName,
              },
            });
          }}
        />
        <When
          desc="Navigate to Settings tab, click 'Calling'"
          action={<NavigateTo path="/settings/calling" />}
        />
        <Then
          desc="There should be an 'i' button near the label 'Make my calls with'"
          action={
            <CheckCallSettingPage
              titleContent="Make my calls with"
              infoIcon={true}
            />
          }
        />
        <When
          desc="Select 'Browser' in 'Make my calls with', then clicks on the 'i' button(Not applicable to Zendesk 2.0)"
          action={[
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="Browser" />,
          ]}
        />
        <Then
          desc="Tooltip should read 'Use this option to make and receive calls using your computers microphone and speaker.'"
          action={
            <CheckCallSettingPage tooltipContent="Use this option to make and receive calls using your computer’s microphone and speaker." />
          }
        />
        <When
          desc="Select '{BrandName} App' in 'Make my calls with', then clicks on the 'i' button
										(Only RC brand)"
          action={({ jupiterAppName }: ExampleItem) => [
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName={jupiterAppName} />,
          ]}
        />
        <Then
          desc="The tooltip should read 'Use this option to make and receive calls using your{BrandName} App.'
										[L10N]"
          action={({ jupiterAppName }: ExampleItem) => [
            <CheckCallSettingPage
              tooltipContent={`Use this option to make and receive calls using your ${jupiterAppName}.`}
            />,
          ]}
        />
        <When
          desc="Select '[BrandName Phone]' in 'Make my calls with', then clicks on the 'i' button"
          action={({ softphoneAppName }: ExampleItem) => [
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName={softphoneAppName} />,
          ]}
        />
        <Then
          desc="Tooltip should read 'Use this option to make and receive calls using your [BrandName].'
										[L10N]"
          action={({ softphoneAppName }: ExampleItem) => [
            <CheckCallSettingPage
              tooltipContent={`Use this option to make and receive calls using your ${softphoneAppName}.`}
            />,
          ]}
        />
        <When
          desc="Select 'RingOut' in 'Make my calls with', then clicks on the 'i' button"
          action={[
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="RingOut" />,
          ]}
        />
        <Then
          desc="Tooltip should read 'Use this option to make calls using your selected or entered phone number. For the call you make, this phone will ring first then the party you called.'"
          action={[
            <CheckCallSettingPage tooltipContent="Use this option to make calls using your selected or entered phone number." />,
            <CheckCallSettingPage tooltipContent="For the call you make, this phone will ring first then the party you called." />,
          ]}
        />
      </Scenario>
    );
  }
}
