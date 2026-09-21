import { render, waitFor } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import React from 'react';

import { ContactSearchPanel } from '../../components/ContactSearchPanel/ContactSearchPanel';
import { TabsEnum } from '../../components/ContactSearchPanel/ContactSearchPanelEnum';

const companyContact = {
  isPrimary: true,
  id: 'contact-1',
  type: 'company',
  name: 'Alice',
  phoneNumber: '+16501234567',
  phoneType: 'directPhone',
  contact: { id: 'contact-1', type: 'company', name: 'Alice' },
} as any;

const getProps = () => ({
  currentLocale: 'en-US',
  companyContacts: [companyContact],
  otherContacts: [],
  personalContacts: [],
  thirdPartyContacts: [],
  thirdPartySourceName: 'Salesforce',
  isThirdPartySearching: false,
  directlyProceedText: 'Call',
  defaultTab: TabsEnum.company,
  searchHandler: jest.fn().mockResolvedValue(undefined),
  setFilterString: jest.fn(),
  formatPhone: (phoneNumber: string) => phoneNumber,
  getCompanyExtraInfoByIds: jest.fn(),
  changeTabTrack: jest.fn(),
  getPresence: jest.fn().mockResolvedValue(null),
  optionClickHandler: jest.fn(),
  triggerEventTracking: jest.fn(),
  inputRef: React.createRef<HTMLInputElement>(),
  userInput: 'ali',
});

describe('ContactSearchPanel', () => {
  it('fetches company extra info for rendered primary contacts', async () => {
    const props = getProps();
    render(<ContactSearchPanel {...props} />);

    await waitFor(() => {
      expect(props.getCompanyExtraInfoByIds).toHaveBeenCalledWith([
        'contact-1',
      ]);
    });
  });
});
