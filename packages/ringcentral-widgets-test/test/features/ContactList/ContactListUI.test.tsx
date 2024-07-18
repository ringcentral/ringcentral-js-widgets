import { AllContactSourceName } from '@ringcentral-integration/commons/lib/contactHelper';
import { mockModuleGenerator } from '@ringcentral-integration/commons/test/lib/mockModule';
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';
import { ContactListUI } from '@ringcentral-integration/widgets/modules/ContactListUI';

const getMockModule = () =>
  mockModuleGenerator({
    searchFilter: '',
    sourceFilter: AllContactSourceName,
  });

@autorun(test)
@title('ContactListUI Module "_updateFilters" action')
export class UpdateFilter extends Step {
  @examples(`
    | options                                                           | sourceFilter              | searchFilter |
    | { sourceFilter: '${AllContactSourceName}', searchFilter: 'Test' } | '${AllContactSourceName}' | 'Test'       |
    | { sourceFilter: 'company', searchFilter: '' }                     | 'company'                 | ''           |
    | { sourceFilter: 'personal', searchFilter: '123' }                 | 'personal'                | '123'        |
  `)
  run() {
    return (
      <Scenario desc="ContactListUI Module '_updateFilters' action">
        <Given
          desc="Create an ContactListUI instance with default value"
          action={(_: any, context: any) => {
            const contactListUI = new ContactListUI({} as any);
            expect(contactListUI.sourceFilter).toBe(AllContactSourceName);
            expect(contactListUI.searchFilter).toBe('');
            context.instance = contactListUI;
          }}
        />
        <When
          desc="Call ContactListUI '_updateFilters' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._updateFilters.call(
              context.mockModule,
              context.example.options,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.sourceFilter).toBe(
              context.example.sourceFilter,
            );
            expect(context.mockModule.searchFilter).toBe(
              context.example.searchFilter,
            );
          }}
        />
      </Scenario>
    );
  }
}
