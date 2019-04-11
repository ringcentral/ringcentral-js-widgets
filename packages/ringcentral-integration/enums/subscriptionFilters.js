import HashMap from '../lib/HashMap';

export default new HashMap({
  presence: '/account/~/extension/~/presence',
  detailedPresence: '/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/account/~/extension/~',
  accountExtension: '/account/~/extension',
  companyContacts: '/account/~/directory/contacts',
});
