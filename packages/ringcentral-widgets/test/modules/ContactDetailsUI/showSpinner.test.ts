import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { phone } from './testSetup';

const defaultPropsParams = {
  params: {
    contactId: '',
    contactType: '',
  },
};

// TODO: refactor to use IT
describe.skip('If all the dependencies are true, return true; Otherwise return false;', () => {
  test.each`
    localeReady | contactSearchReady | appFeaturesReady | expected
    ${true}     | ${true}            | ${true}          | ${false}
    ${false}    | ${true}            | ${true}          | ${true}
    ${true}     | ${false}           | ${true}          | ${true}
    ${true}     | ${true}            | ${false}         | ${true}
  `(
    'Given localeReady = $localeReady, contactSearchReady = $contactSearchReady, appFeaturesReady = $appFeaturesReady, return $expected',
    ({ localeReady, contactSearchReady, appFeaturesReady, expected }) => {
      const { showSpinner } = new ContactDetailsUI({
        ...phone,
        locale: { ready: localeReady },
        contactSearch: { ready: contactSearchReady },
        appFeatures: { ready: appFeaturesReady },
      }).getUIProps(defaultPropsParams);

      expect(showSpinner).toBe(expected);
    },
  );
});
