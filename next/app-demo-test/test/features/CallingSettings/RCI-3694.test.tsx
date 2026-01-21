import {
  And,
  autorun,
  common,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

/* RCI-3694: Call from App(Jupiter) Jupiter App Name I18n Support
https://test_it_domain/RCI-3694
Preconditions:
The name property in callWithJupiter in the app's brandConfig is configured to use the following i18n values: en-US: 'en-US App Name', fr-FR: 'fr-FR App Name'.
User is logged-in into 3rd party
CTI app is integrated,
The user has logged in CTI app



Entry point(/s):

Settings > Calling > Make my calls with
*/
import { fireEvent, screen } from '@testing-library/react';

import { CheckDropdown, ExpandDropdown } from '../../steps/Dropdown';
import { Entry } from '../../steps/Entry';
import { Login } from '../../steps/Login';
import { NavigateToCallingSetting } from '../../steps/Navigate';
import { SetLocale } from '../../steps/SetLocale';
import { SetupBrandConfig } from '../../steps/SetupBrandConfig';

@autorun(test)
@common
@title('Jupiter App Name I18n Support')
export class CallingSettingJupiterI18nSupport extends Step {
  run() {
    return (
      <Scenario desc="Jupiter App Name I18n Support">
        <Given desc="Create phone instance and login" action={[Entry, Login]} />
        <Given
          desc="brandConfig with callWithJupiter with i18n support"
          action={() => <SetupBrandConfig />}
        />
        <When
          desc="App navigate to calling setting page"
          action={() => <NavigateToCallingSetting />}
        />
        <And
          desc="App expand calling setting dropdown selection"
          action={() => <ExpandDropdown testId="callingSetting" />}
        />
        <And
          desc="App locale is set to 'en-US'"
          action={() => <SetLocale locale="en-US" />}
        />
        <Then
          desc="Check jupiter app name"
          action={() => <CheckDropdown appName="en-US App Name" />}
        />
        <When
          desc="App locale is set to 'fr-FR'"
          action={() => <SetLocale locale="fr-FR" />}
        />
        <Then
          desc="Check jupiter app name"
          action={() => <CheckDropdown appName="fr-FR App Name" />}
        />
        <When
          desc="App locale is set to 'fr'"
          action={() => <SetLocale locale="fr" />}
        />
        <Then
          desc="Check jupiter app name"
          action={() => <CheckDropdown appName="fr-FR App Name" />}
        />
        <When
          desc="App locale is set to 'fr-CA'"
          action={() => <SetLocale locale="fr-CA" />}
        />
        <Then
          desc="Check jupiter app name"
          action={() => <CheckDropdown appName="fr-FR App Name" />}
        />
      </Scenario>
    );
  }
}
