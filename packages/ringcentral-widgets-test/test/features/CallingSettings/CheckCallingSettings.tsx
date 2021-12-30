import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  And,
  Then,
  Step,
  it,
} from '../../lib/step';
import { NavigateTo } from '../../steps/Router/action';
import {
  ExpandDropdown,
  SelectCallingSetting,
} from '../../steps/Settings/actions/SetCallSetting';
import { CheckInfoTooltip } from '../../steps/Settings/checks/CheckCallSettingPage';

export const CheckCallingSettings = <T,>({
  Login,
  expectedJupiterName,
  expectedPhoneName,
}: {
  Login: T;
  expectedJupiterName: string;
  expectedPhoneName: string;
}) => {
  @autorun(test)
  @it
  @title('Check Calling Settings tooltip')
  class RCI803 extends Step {
    run() {
      return (
        <Scenario desc="Create phone instance and login">
          <Given desc="Create phone instance and login" action={Login} />
          <When
            desc="App navigate to calling setting page"
            action={<NavigateTo path="/settings/calling" />}
          />
          <And
            desc="App expand calling setting dropdown selection"
            action={ExpandDropdown}
          />
          <And
            desc="select Browser in make call with dropdown menu"
            action={<SelectCallingSetting settingName="Browser" />}
          />
          <Then
            desc="Tooltip should read 'Use this option to make and receive calls using your computer’s microphone and speaker.'"
            action={
              <CheckInfoTooltip tooltipContent="Use this option to make and receive calls using your computer’s microphone and speaker." />
            }
          />
          <When
            desc="select {expectedJupiterName} in make call with dropdown menu"
            action={<SelectCallingSetting settingName={expectedJupiterName} />}
          />
          <Then
            desc="Tooltip should read 'Use this option to make and receive calls using your {expectedJupiterName}.'"
            action={
              <CheckInfoTooltip
                tooltipContent={`Use this option to make and receive calls using your ${expectedJupiterName}.`}
              />
            }
          />
          <When
            desc="select {expectedPhoneName} in make call with dropdown menu"
            action={<SelectCallingSetting settingName={expectedPhoneName} />}
          />
          <Then
            desc="Tooltip should read 'Use this option to make and receive calls using your {expectedPhoneName}."
            action={
              <CheckInfoTooltip
                tooltipContent={`Use this option to make and receive calls using your ${expectedPhoneName}.`}
              />
            }
          />
          <When
            desc="select RingOut in make call with dropdown menu"
            action={<SelectCallingSetting settingName="RingOut" />}
          />
          <Then
            desc="Tooltip should read 'Use this option to make calls using your selected or entered phone number. For the call you make, this phone will ring first then the party you called.'"
            action={
              <>
                <CheckInfoTooltip tooltipContent="Use this option to make calls using your selected or entered phone number." />
                <CheckInfoTooltip tooltipContent="For the call you make, this phone will ring first then the party you called." />
              </>
            }
          />
        </Scenario>
      );
    }
  }
};
