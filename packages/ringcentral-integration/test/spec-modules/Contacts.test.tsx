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
import { Contacts, DEFAULT_SOURCE_FILTER } from '../../modules/ContactsV2';

const getMockModule = () => ({
  searchFilter: '',
  sourceFilter: DEFAULT_SOURCE_FILTER,
  state: {},
  _dispatch: () => {},
  parentModule: {},
});

@autorun(test)
@title('Contacts Module "_updateFilter" action')
export class UpdateFilter extends Step {
  @examples(`
    | options                                           | sourceFilter    | searchFilter |
    | { searchFilter: 'Test' }                          | 'all'           | 'Test'       |
    | { sourceFilter: 'company' }                       | 'company'       | ''           |
    | { sourceFilter: 'personal', searchFilter: '123' } | 'personal'      | '123'        |
  `)
  run() {
    return (
      <Scenario desc="Contacts Module '_updateFilter' action">
        <Given
          desc="Create an Contacts instance with default value"
          action={(_: any, context: any) => {
            const contacts = new Contacts({} as any);
            expect(contacts._initialValue.sourceFilter).toBe(
              DEFAULT_SOURCE_FILTER,
            );
            expect(contacts._initialValue.searchFilter).toBe('');
            context.instance = contacts;
          }}
        />
        <When
          desc="Call Contacts '_updateFilter' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._updateFilter.call(
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
