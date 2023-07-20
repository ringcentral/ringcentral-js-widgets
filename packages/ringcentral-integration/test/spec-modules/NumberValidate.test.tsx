import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  And,
  title,
} from '@ringcentral-integration/test-utils';

import { NumberValidate } from '../../modules/NumberValidate';

@autorun(test)
@title('get available extension test')
export class getAvailableExtension extends Step {
  @examples(`
    | inputNumber  | res    |
    | '101'        | '101'  |
    | '102'        | null   |
    | '+23112'     | null   |
    | '2901321'    | null   |
  `)
  run() {
    return (
      <Scenario desc="should return correct value">
        <Given
          desc="An NumberValidate instance"
          action={(_: any, context: any) => {
            context.instance = new NumberValidate({
              client: {} as any,
              brand: {} as any,
              regionSettings: {} as any,
              accountInfo: {} as any,
              companyContacts: {
                filteredContacts: [
                  {
                    extensionNumber: '101',
                  },
                ],
                ivrContacts: [],
              } as any,
              extensionInfo: {} as any,
            });
          }}
        />
        <Then
          desc="should return correct result value"
          action={(_: any, context: any) => {
            expect(
              context.instance.getAvailableExtension(
                context.example.inputNumber,
              ),
            ).toBe(context.example.res);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('is available extension test')
export class isAvailableExtension extends Step {
  @examples(`
    | inputNumber  | res    |
    | '101'        | true   |
    | '102'        | false  |
    | '+23112'     | false  |
    | '2901321'    | false  |
  `)
  run() {
    return (
      <Scenario desc="should return correct value">
        <Given
          desc="An NumberValidate instance"
          action={(_: any, context: any) => {
            context.instance = new NumberValidate({
              client: {} as any,
              brand: {} as any,
              regionSettings: {} as any,
              accountInfo: {} as any,
              companyContacts: {
                filteredContacts: [
                  {
                    extensionNumber: '101',
                  },
                ],
                ivrContacts: [],
              } as any,
              extensionInfo: {} as any,
            });
          }}
        />
        <Then
          desc="should return correct result value"
          action={(_: any, context: any) => {
            expect(
              context.instance.isAvailableExtension(
                context.example.inputNumber,
              ),
            ).toBe(context.example.res);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('is not an extension test')
export class isNotAnExtension extends Step {
  @examples(`
    | inputNumber  | res    |
    | '101'        | false  |
    | '+23112'     | false  |
    | '2901321'    | false  |
  `)
  run() {
    return (
      <Scenario desc="should return correct value">
        <Given
          desc="An NumberValidate instance"
          action={(_: any, context: any) => {
            context.instance = new NumberValidate({
              client: {} as any,
              brand: {} as any,
              regionSettings: {} as any,
              accountInfo: {} as any,
              companyContacts: {
                isAvailableExtension() {
                  return true;
                },
              } as any,
              extensionInfo: {} as any,
            });
          }}
        />
        <Then
          desc="should return correct result value"
          action={(_: any, context: any) => {
            expect(
              context.instance.isNotAnExtension(context.example.inputNumber),
            ).toBe(context.example.res);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('is company extension test')
export class isCompanyExtension extends Step {
  @examples(`
    | companyNumber  | extensionNumber  | res   |
    | '101'          |   '101'          | true  |
    | '102'          |   '101'          | false |
  `)
  run() {
    return (
      <Scenario desc="should return correct value">
        <Given
          desc="An NumberValidate instance"
          action={(_: any, context: any) => {
            context.instance = new NumberValidate({
              client: {} as any,
              brand: {} as any,
              regionSettings: { countryCode: 'US', areaCode: '' } as any,
              accountInfo: { mainCompanyNumber: '101' } as any,
              companyContacts: {
                isAvailableExtension() {
                  return true;
                },
              } as any,
              extensionInfo: {} as any,
            });
          }}
        />
        <Then
          desc="should return correct result value"
          action={(_: any, context: any) => {
            expect(
              context.instance.isCompanyExtension(
                context.example.companyNumber,
                context.example.extensionNumber,
              ),
            ).toBe(context.example.res);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('validate with number parser test')
export class validateWithNumberParser extends Step {
  run() {
    return (
      <Scenario desc="should return correct value">
        <Given
          desc="An NumberValidate instance"
          action={(_: any, context: any) => {
            context.instance = new NumberValidate({
              client: {} as any,
              brand: {} as any,
              regionSettings: { countryCode: 'US', areaCode: '' } as any,
              accountInfo: {} as any,
              companyContacts: {
                isAvailableExtension() {
                  return true;
                },
              } as any,
              extensionInfo: {} as any,
            });
            jest
              .spyOn(context.instance, '_numberParser')
              .mockImplementation((args) => args);
          }}
        />
        <Then
          desc="should return correct result value"
          action={async (_: any, context: any) => {
            const res = await context.instance.validateWithNumberParser([
              '101',
              '102',
            ]);
            expect(res.result).toBe(true);
          }}
        />
        <And
          desc="should not return error result value for Special number"
          action={async (_: any, context: any) => {
            const spy = jest
              .spyOn(context.instance, '_isSpecial')
              .mockImplementation(() => true);

            const res = await context.instance.validateWithNumberParser([
              '101',
            ]);
            expect(res.result).toBe(true);
            spy.mockRestore();
          }}
        />
        <And
          desc="should return error result value"
          action={async (_: any, context: any) => {
            const spy = jest
              .spyOn(context.instance, 'getAvailableExtension')
              .mockImplementation(() => false);

            const res = await context.instance.validateWithNumberParser([
              { originalString: '101' },
            ]);
            expect(res.result).toBe(false);
            spy.mockRestore();
          }}
        />
      </Scenario>
    );
  }
}
