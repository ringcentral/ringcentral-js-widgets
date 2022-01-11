/* RCI-3694: Call from App(Jupiter) Jupiter App Name I18n Support
https://testit.ringcentral.com/RCI-3694
Preconditions:
The name property in callWithJupiter in the app's brandConfig is configured to use the following i18n values: en-US: 'en-US App Name', fr-FR: 'fr-FR App Name'.
User is logged-in into 3rd party
CTI app is integrated,
The user has logged in CTI app



Entry point(/s):

Settings > Calling > Make my calls with
*/
import { screen, fireEvent } from '@testing-library/react';
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  And,
  Then,
  Step,
  StepFunction,
  examples,
} from '../../lib/step';
import { Login } from '../../steps/Login';

// TODO: refactor all steps in `steps` folder with `@testing-library/react` and move these steps to `steps` folder
const SetupBrandConfig: StepFunction = (props, context) => {
  const { phone } = context;
  phone.brand.setDynamicConfig({
    ...phone.brand.brandConfig,
    callWithJupiter: {
      link: 'http://localhost/',
      protocol: 'mock://',
      // TODO: find a better way to generic this I18nStrings object
      name: {
        __i18n__: true,
        translations: {
          'en-US': 'en-US App Name',
          'fr-FR': 'fr-FR App Name',
          fr: 'fr-FR App Name',
          en: 'en-US App Name',
        },
      },
    },
  });
};

const SetLocale: StepFunction<{ locale: string }> = async (props, context) => {
  await context.phone.locale.setLocale(props.locale);
};

const NavigateTo: StepFunction<{ path: string }> = ({ path }, { phone }) => {
  phone.routerInteraction.push(path);
};

const ExpandDropdown: StepFunction<{ testId: string }> = ({ testId }) => {
  fireEvent.click(screen.getByTestId(testId));
};

const CheckDropdown: StepFunction<{ appName: string }> = async ({
  appName,
}) => {
  expect(screen.getByText(appName)).toBeInTheDocument();
};

@autorun(test)
@title('Jupiter App Name I18n Support')
export class CallingSettingJupiterI18nSupport extends Step {
  run() {
    return (
      <Scenario desc="Jupiter App Name I18n Support">
        <Given desc="Create phone instance and login" action={Login} />
        <Given
          desc="brandConfig with callWithJupiter with i18n support"
          action={() => <SetupBrandConfig />}
        />
        <When
          desc="App navigate to calling setting page"
          action={() => <NavigateTo path="/settings/calling" />}
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
