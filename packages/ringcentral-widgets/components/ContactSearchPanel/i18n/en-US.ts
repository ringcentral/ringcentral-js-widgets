import { HintsType } from '../ContactSearchPanelEnum';

export default {
  [HintsType.thirdPartyNoRecordsContent]:
    'Enter at least {minimumLength} characters or digits to search all {sourceName} records.',
  [HintsType.noFilterOrSearchRecordsTitle]: 'No results found',
  [HintsType.noFilterOrSearchRecordsContent]:
    'Check results from other sources or change your keyword.',
  [HintsType.searching]: 'Searching...',
  companyTabTitle: 'Company',
  personalTabTitle: 'Personal',
  direct: 'Direct',
  extension: 'Ext',
  contact: 'Contact',
  mobile: 'Mobile',
  company: 'Company',
  home: 'Home',
  home2: 'Home',
  other: 'Other',
  business: 'Business',
  business2: 'Business',
  car: 'Car',
  fax: 'Fax',
  assistant: 'Assistant',
  callback: 'Callback',
  MobileNumber: 'Mobile Number',
  ContactNumber: 'Contact Number',
  DirectNumber: 'Direct Number',
  doNotCall: 'Do Not Call',
} as const;
