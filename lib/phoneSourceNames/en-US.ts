import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';

export default {
  [phoneSources.account]: 'Account',
  [phoneSources.contact]: 'Contact',
  [phoneSources.rcContact]: '{brand}',
  [phoneSources.lead]: 'Lead',
  [phoneSources.opportunity]: 'Opportunity',
  [phoneSources.systemUser]: 'System User',
};
