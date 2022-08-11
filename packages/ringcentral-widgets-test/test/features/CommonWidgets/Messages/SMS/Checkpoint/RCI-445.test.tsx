/**
 * RCI-445: Local number formatting
 * https://test_id_domain/test-cases/RCI-445
 * Preconditions:
 * <ol><li style='margin: 0px; padding: 0px;'>User is logged-in into 3rd party</li><li style='margin: 0px; padding: 0px;'>User has logged into CTI App with the account which has multiple dialing plans as below</li></ol><table class='table table-bordered'><tbody><tr><td><span style='font-weight: bold;'>Set DL(Dialing plans) in SW</span></td><td><span style='font-weight: bold;'>Country</span></td></tr><tr><td>US</td><td>US</td></tr><tr><td>CA</td><td>CA</td></tr></tbody></table><p style='margin: 0px; padding: 0px;'><i style='background-color: transparent;'><span style='font-weight: bolder;'>Note(/s)</span>: </i><span style='background-color: transparent;'>For Salesforce 6.0, user has logged into CTI app and set his locale to US/CA in Salesforce</span></p><p><strong><span style='color:#669966'><br></span></strong></p><p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p><p>> Go to the 'Setting'</p><p>> Click 'Region' option</p>
 */

import dialingPlanBody from '@ringcentral-integration/commons/integration-test/mock/data/dialingPlan.json';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { Login as CommonLogin } from '../../../../../steps/Login';
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
} from '../../../../../lib/step';
import {
  NavigateToSettings,
  NavigateToRegionSettings,
  NavigateToComposeText,
} from '../../../../../steps/Navigate';
import { SelectCountryCode, SetAreaCode } from '../../../../../steps/Settings';
import { SendSMS } from '../../../../../steps/Messages';
import { Context } from '../../../../../interfaces';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
} from '../../../../../steps/Mock';

interface LocalNumberFormattingProps {
  country: string;
  phoneNumber: string;
}

@autorun(test.skip)
@it
@p2
@title('Local number formatting')
export class LocalNumberFormatting extends Step {
  Login?: StepFunction<
    {
      mockParams: { dialingPlansData?: Partial<typeof dialingPlanBody> };
    },
    any
  >;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  @examples(`
    | country              | phoneNumber  |
    | '(+1) United States' | '4091529'    |
    | '(+1) Canada'        | '6504091529' |
  `)
  run() {
    const { Login = CommonLogin, CreateMock } = this;
    return (
      <Scenario desc="Local number formatting">
        <When
          desc="Go to entry points, set {Country} and enter area code, save
 Note(/s):For Salesforce 6.0, set{Country}in Salesforce, and enter area code in Region setting page in RC CTI APP."
          action={[
            CreateMock,
            <MockGetPhoneNumber />,
            (props: LocalNumberFormattingProps, { rcMock }: Context) => {
              rcMock.defaultInitMocks.delete(rcMock.getMessageSync);
              rcMock.defaultInitMocks.add(() =>
                rcMock.getMessageSync({ repeat: 2 }),
              );
              rcMock.defaultInitMocks.add(() =>
                rcMock.postParerPhoneNumbers((mockData) => {
                  switch (props.country) {
                    case '(+1) Canada':
                      return {
                        ...mockData,
                        homeCountry: {
                          uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/39',
                          id: '39',
                          name: 'Canada',
                          isoCode: 'CA',
                          callingCode: '1',
                        },
                        phoneNumbers: [
                          {
                            originalString: '+16504091529',
                            country: {
                              uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1',
                              id: '1',
                              name: 'United States',
                              isoCode: 'US',
                              callingCode: '1',
                            },
                            areaCode: '650',
                            subscriberNumber: '4091529',
                            formattedNational: '(650) 409-1529',
                            formattedInternational: '+1 (650) 4091529',
                            dialable: '6504091529',
                            e164: '+16504091529',
                            special: false,
                            normalized: '16504091529',
                            tollFree: false,
                          },
                        ],
                      };
                    case '(+1) United States':
                    default:
                      return mockData;
                  }
                }, 2),
              );
            },
            <Login
              // need refactoring
              mockParams={{
                dialingPlansData: {
                  records: [
                    {
                      uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/1',
                      id: '1',
                      name: 'United States',
                      isoCode: 'US',
                      callingCode: '1',
                    },
                    {
                      uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/353',
                      id: '353',
                      name: 'Canada',
                      isoCode: 'CA',
                      callingCode: '1',
                    },
                  ],
                },
              }}
            />,
            NavigateToSettings,
            NavigateToRegionSettings,
          ]}
        />
        <Then
          desc="Settings are saved."
          action={async ({ country }: LocalNumberFormattingProps) => [
            <SelectCountryCode countryCode={country} />,
            <SetAreaCode areaCode="205" />,
          ]}
        />
        <When
          desc="> Go to Compose Text, > Enter the following type of {Numbers}
   > Fill text 'Test sms'
   > Click 'Send'
   Note(/s):
   7 digit local number, e.g4091529
   local numebr, e.g6504091529"
          action={[
            NavigateToComposeText,
            async ({ phoneNumber }: LocalNumberFormattingProps) => (
              <SendSMS phoneNumber={phoneNumber} />
            ),
          ]}
        />
        <Then
          desc="Message is sent."
          action={async (
            props: LocalNumberFormattingProps,
            context: Context,
          ) => {
            await waitForRenderReady();
            expect(
              context.rcMock.fetchMock.called(
                'express:/restapi/v1.0/account/~/extension/~/sms',
              ),
            ).toBeTruthy();
          }}
        />
      </Scenario>
    );
  }
}
