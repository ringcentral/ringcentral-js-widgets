import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { phone } from './testUtils';

const defaultPropsParams = {
  params: {
    contactId: '',
    contactType: '',
  },
};

describe('If all the dependencies are true, return true; Otherwise return false;', () => {
  test.each`
    localeReady | contactSearchReady | rolesAndPermissionsReady | expected
    ${true}     | ${true}            | ${true}                  | ${false}
    ${false}    | ${true}            | ${true}                  | ${true}
    ${true}     | ${false}           | ${true}                  | ${true}
    ${true}     | ${true}            | ${false}                 | ${true}
  `(
    'Given localeReady = $localeReady, contactSearchReady = $contactSearchReady, rolesAndPermissionsReady = $rolesAndPermissionsReady, return $expected',
    ({
      localeReady,
      contactSearchReady,
      rolesAndPermissionsReady,
      expected,
    }) => {
      const { showSpinner } = new ContactDetailsUI({
        ...phone,
        locale: { ready: localeReady },
        contactSearch: { ready: contactSearchReady },
        rolesAndPermissions: { ready: rolesAndPermissionsReady },
      }).getUIProps(defaultPropsParams);

      expect(showSpinner).toBe(expected);
    },
  );
});
