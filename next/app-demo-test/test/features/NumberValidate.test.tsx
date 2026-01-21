import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  autorun,
  common,
  Given,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../steps/Alert';
import { Entry } from '../steps/Entry';
import { Login } from '../steps/Login';
import { MockNumberParserV1 } from '../steps/Mock';
import { CheckRoutePathIs } from '../steps/Router';

@autorun(test)
@common
@title('Check NumberValidate')
export class TestNumberValidate extends Step {
  run() {
    return (
      <Scenario
        desc="User go to the app entry"
        action={
          <Entry mocks={[<MockNumberParserV1 isDefaultInit={false} />]} />
        }
      >
        <Given desc="User login app and go to dialer page" action={Login} />
        <Then
          desc="numberValidate functions"
          action={[
            (async (_, { app }) => {
              const numberValidate = app.container.got(NumberValidate)!;

              const result = numberValidate.isNoToNumber('');
              expect(result).toBeTruthy();
            }) as StepFunction,
            (async (_, { app }) => {
              const numberValidate = app.container.got(NumberValidate)!;

              expect(
                numberValidate['_isSpecial']({ special: true }),
              ).toBeTruthy();
              expect(
                numberValidate['_isSpecial']({ special: false }),
              ).toBeFalsy();

              expect(numberValidate['isAnExtensionNumber']('')).toBeTruthy();
              expect(
                numberValidate['isAnExtensionNumber']('10', 2),
              ).toBeTruthy();
              expect(
                numberValidate['isAnExtensionNumber']('102222'),
              ).toBeTruthy();
              expect(
                numberValidate['isAnExtensionNumber']('1022223'),
              ).toBeFalsy();

              expect(
                numberValidate['isAvailableExtension']('1022223'),
              ).toBeFalsy();
              expect(numberValidate['isNotAnExtension']('1022223')).toBeFalsy();
              expect(
                numberValidate['isCompanyExtension']('+18883495556', '1022223'),
              ).toBeFalsy();

              expect(
                numberValidate['isCompanyExtension']('+18883495557', '101'),
              ).toBeFalsy();

              expect(
                numberValidate['isCompanyExtension']('+18883495556', '101'),
              ).toBeTruthy();

              expect(await numberValidate['validateNumbers'](['+18883495556']))
                .toMatchInlineSnapshot(`
{
  "errors": [],
  "numbers": [
    {
      "areaCode": "205",
      "country": {
        "callingCode": "1",
        "id": "1",
        "isoCode": "US",
        "name": "United States",
        "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1",
      },
      "dialable": "2054091529",
      "e164": "+12054091529",
      "formattedInternational": "+1 (205) 4091529",
      "formattedNational": "(205) 409-1529",
      "international": true,
      "isAnExtension": false,
      "normalized": "12054091529",
      "originalString": "+18883495556",
      "special": false,
      "subscriberNumber": "4091529",
      "tollFree": false,
    },
  ],
  "result": true,
}
`);

              expect(await numberValidate['validateNumbers'](['+2ab']))
                .toMatchInlineSnapshot(`
{
  "errors": [
    {
      "phoneNumber": "+2ab",
      "type": "noToNumber",
    },
  ],
  "result": false,
}
`);

              const result = await numberValidate['validateWithNumberParser']([
                '+2ab',
              ]);
              expect(result).toMatchInlineSnapshot(`
{
  "errors": [
    {
      "phoneNumber": "",
      "type": "notAnExtension",
    },
  ],
  "numbers": [],
  "result": false,
}
`);

              numberValidate['handleValidateToasts'](result);

              expect(
                await numberValidate['validateWithNumberParser']([
                  '+18883495556',
                ]),
              ).toMatchInlineSnapshot(`
{
  "errors": [],
  "numbers": [
    {
      "areaCode": "205",
      "country": {
        "callingCode": "1",
        "id": "1",
        "isoCode": "US",
        "name": "United States",
        "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1",
      },
      "dialable": "2054091529",
      "e164": "+12054091529",
      "formattedInternational": "+1 (205) 4091529",
      "formattedNational": "(205) 409-1529",
      "international": true,
      "isAnExtension": false,
      "normalized": "12054091529",
      "originalString": "+18883495556",
      "special": false,
      "subscriberNumber": "4091529",
      "tollFree": false,
    },
  ],
  "result": true,
}
`);

              return (
                <>
                  <CheckAlertMessage message="The extension number does not exist." />
                  {async () => {
                    numberValidate['handleValidateToasts']({
                      errors: [
                        {
                          phoneNumber: '',
                          type: 'noAreaCode',
                        },
                      ],
                      numbers: [],
                      result: false,
                    });
                  }}
                  <CheckAlertMessage message="Please set area code to use 7-digit local phone numbers." />
                  {async () => {
                    userEvent.click(screen.getByText('area code'));
                  }}
                  <CheckRoutePathIs path="/settings/region" />
                  {async () => {
                    numberValidate['handleValidateToasts']({
                      errors: [],
                      numbers: [],
                      result: false,
                    });
                  }}
                  <CheckAlertMessage message="Please enter a valid phone number." />
                  {async () => {
                    (numberValidate as any)['_extensionInfo'] = null;
                    expect(
                      numberValidate['getAvailableExtension']('102'),
                    ).toBeNull();

                    const result = await numberValidate['parseNumbers']([
                      '+111223102',
                    ]);
                    expect(result).toMatchInlineSnapshot(`
[
  {
    "availableExtension": null,
    "category": "Regular",
    "dialable": "6505819954",
    "dialableExtended": "6505819954",
    "e164": "+111223102",
    "e164Extended": "+111223102",
    "international": "+1 (650) 5819954",
    "internationalExtended": "+1 650 581 9954",
    "isAnExtension": false,
    "isInternational": false,
    "national": "(650) 581-9954",
    "nationalExtended": "(650) 581-9954",
    "originalString": "6505819954",
    "parsedNumber": "+111223102",
    "specialService": false,
  },
]
`);
                    expect(
                      numberValidate['handleResult']({
                        availableExtension: null,
                        category: 'Unknown',
                        dialable: '6505819954',
                        dialableExtended: '6505819954',
                        e164: '+111223102',
                        e164Extended: '+111223102',
                        international: '+1 (650) 5819954',
                        internationalExtended: '+1 650 581 9954',
                        isAnExtension: false,
                        isInternational: false,
                        national: '(650) 581-9954',
                        nationalExtended: '(650) 581-9954',
                        originalString: '6505819954',
                        parsedNumber: '+111223102',
                        specialService: false,
                        formats: [
                          {
                            dialableExtended: 'example',
                            dialable: 'example',
                          },
                        ],
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": null,
  "dialable": "example",
  "dialableExtended": "example",
  "isAnExtension": false,
  "isInternational": false,
  "originalString": "6505819954",
  "parsedNumber": "example",
  "specialService": false,
}
`);

                    expect(
                      numberValidate['handleResult']({
                        availableExtension: null,
                        category: 'Unknown2',
                        dialable: '6505819954',
                        dialableExtended: '6505819954',
                        e164: '+111223102',
                        e164Extended: '+111223102',
                        international: '+1 (650) 5819954',
                        internationalExtended: '+1 650 581 9954',
                        isAnExtension: false,
                        isInternational: false,
                        national: '(650) 581-9954',
                        nationalExtended: '(650) 581-9954',
                        originalString: '6505819954',
                        parsedNumber: '+111223102',
                        specialService: false,
                        formats: [
                          {
                            dialableExtended: 'example',
                            dialable: 'example',
                          },
                        ],
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": null,
  "dialable": "example",
  "dialableExtended": "example",
  "isAnExtension": false,
  "isInternational": false,
  "originalString": "6505819954",
  "parsedNumber": "6505819954",
  "specialService": false,
}
`);

                    jest
                      .spyOn(numberValidate, 'getAvailableExtension')
                      .mockReturnValue('111111');

                    expect(
                      numberValidate['handleAmbiguous']({
                        availableExtension: null,
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": "111111",
  "isAnExtension": true,
  "isInternational": false,
  "parsedNumber": "111111",
}
`);

                    jest
                      .spyOn(numberValidate, 'getAvailableExtension')
                      .mockReturnValue(null);

                    expect(
                      numberValidate['handleAmbiguous']({
                        availableExtension: null,
                        formats: [
                          {
                            dialableExtended: 'example',
                            dialable: 'example',
                            category: 'cool',
                          },
                        ],

                        originalString: '22345678',
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": null,
  "isAnExtension": false,
  "isInternational": true,
  "parsedNumber": "22345678",
}
`);
                    expect(
                      numberValidate['handleAmbiguous']({
                        availableExtension: null,
                        formats: [
                          {
                            dialableExtended: 'example',
                            dialable: 'example',
                            category: 'cool',
                            e164Extended: '12345678',
                            e164: '32345678',
                          },
                        ],
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": null,
  "isAnExtension": false,
  "isInternational": true,
  "parsedNumber": "12345678",
}
`);
                    expect(
                      numberValidate['handleAmbiguous']({
                        availableExtension: null,
                        formats: [
                          {
                            dialableExtended: 'example',
                            dialable: 'example',
                            category: 'cool',
                            e164: '32345678',
                          },
                        ],
                      } as any),
                    ).toMatchInlineSnapshot(`
{
  "availableExtension": null,
  "isAnExtension": false,
  "isInternational": true,
  "parsedNumber": "32345678",
}
`);
                  }}
                </>
              );
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
