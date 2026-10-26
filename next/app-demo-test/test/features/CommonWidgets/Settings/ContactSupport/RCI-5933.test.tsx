/**
 * https://test_it_domain/test-cases/RCI-5933
 * Preconditions:
 * User is logged-in to 3rd party app
 * CTI app is integrated
 * Entry point(/s):
 * More > Settings
 */
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  MockAccountInfoWithBrand,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckTextContent,
  ClickItemByDataSign,
} from '../../../../../../app-demo-test/test/steps/Common';
import { Entry } from '../../../../../../app-demo-test/test/steps/Entry';
import { Login } from '../../../../steps/Login';
import { NavigateToSettings } from '../../../../steps/Navigate';
import { CheckEventTracking } from '../../../../steps/Tracking';

@autorun(test)
@it
@p2
@common
@title('RCI-5933: Contact support screen')
export class RCI5933 extends Step {
  @examples(`
    | brandCode | brandId |
    | 'rc'      | '1210'  |
  `)
  run() {
    return (
      <Scenario desc="Contact support in settings">
        <Given
          desc="Direct to entry point,"
          action={[
            <Entry
              brand={this.example.brandCode}
              mocks={[
                <MockAccountInfoWithBrand brandId={this.example.brandId} />,
              ]}
            />,
            Login,
            NavigateToSettings,
          ]}
        />
        <Then
          desc="The 'Contact support' displayed
										[L10N]"
          action={
            <CheckTextContent
              dataSign="ContactSupport"
              content="Contact support"
            />
          }
        />
        <When
          desc="Click on 'Contact support'"
          action={<ClickItemByDataSign dataSign="ContactSupport" />}
        />
        <Then
          desc="Verify 'Contact support' screen header with back button"
          action={() => {
            expect(screen.getByTestId('headerTitle')).toHaveTextContent(
              'Contact Support',
            );
            expect(screen.getByTestId('backButton')).toBeInTheDocument();
          }}
        />
        <Then
          desc="We arrive at the new 'Contact support' page with:
            Step 1: Contact support
               - If you'd like to get a response ...
               - 'Create support case' button which has a hyperlink, link: Create a support ticket https://support.ringcentral.com/new-case.html
            Step 2: Submit log (optional)
               - Description: 'This will help us identify ...'
               - A text field labeled 'Description' with placeholder 'Tell us what the problem is...'
               - Add attachment
               - Submit (initially disabled)
               - Disclaimer text with Terms of Service and Privacy Notice links
            "
          action={[
            <CheckTextContent content="Step 1: Contact Support" />,
            <CheckTextContent content="If you’d like to get a response from Customer Care, please create a support case." />,
            async () => {
              const brand = app.container.got(Brand)!;
              const createCaseBtn = screen.getByTestId(
                'createSupportTicketBtn',
              );
              expect(createCaseBtn).toBeInTheDocument();
              expect(createCaseBtn).toHaveTextContent('Create support case');
              expect(createCaseBtn).toBeEnabled();
              const openSpy = jest
                .spyOn(window, 'open')
                .mockImplementation(() => null);
              await userEvent.click(createCaseBtn);
              await waitForRenderReady();
              expect(openSpy).toHaveBeenCalledWith(
                brand.brandConfig.supportLink,
                '_blank',
              );
            },
            <CheckEventTracking
              toHaveBeenTracked={{
                event: 'Support_Case_Created',
                trackProps: {},
              }}
            />,
            <CheckTextContent content="Step 2: Submit log (optional)" />,
            <CheckTextContent content="This will help us identify and resolve your issue faster." />,

            () => {
              const descLabel = screen.getByText('Description *');
              expect(descLabel).toBeInTheDocument();
              const descInput = screen.getByPlaceholderText(
                'Tell us what the problem is...',
              );
              expect(descInput).toBeInTheDocument();
              expect(descInput).toHaveValue('');
            },

            () => {
              const addAttachmentBtn = screen.getByTestId('attachFileBtn');
              expect(addAttachmentBtn).toBeInTheDocument();
              expect(addAttachmentBtn).toHaveTextContent('Add attachment');
              expect(addAttachmentBtn).toBeEnabled();
            },

            () => {
              const submitBtn = screen.getByTestId('submitBtn');
              expect(submitBtn).toHaveTextContent('Submit');
              expect(submitBtn).toBeDisabled();
            },

            async () => {
              const brand = app.container.got(Brand)!;
              const disclaimers = screen.getByTestId('privacyNoticeDesc');
              expect(disclaimers).toHaveTextContent(
                `By submitting the log, you agree to allow ${brand.brandConfig.name} to access certain log related information for troubleshooting and error handling purposes. For more information on how ${brand.brandConfig.name} processes personal data, please review our Terms of Service and Privacy Notice.`,
              );
              const termsLink = screen.getByTestId('privacyNoticeLink');
              expect(termsLink).toHaveAttribute(
                'href',
                brand.brandConfig.eulaLink,
              );
              const privacyLink = screen.getByTestId('privacyNoticeEnd');
              expect(privacyLink).toHaveAttribute(
                'href',
                brand.brandConfig.privacyNotice,
              );
            },
          ]}
        />

        <When
          desc="User types any characters into 'Description'"
          action={async () => {
            const descInput = screen.getByPlaceholderText(
              'Tell us what the problem is...',
            ) as HTMLInputElement;
            await userEvent.type(descInput, 'test problem');
          }}
        />
        <Then
          desc="Submit button becomes enabled"
          action={async () => {
            await waitForRenderReady();
            const submitBtn = screen.getByTestId('submitButton');
            expect(submitBtn).toBeEnabled();
          }}
        />
      </Scenario>
    );
  }
}
