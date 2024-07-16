import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import type { ManualEntryPanelProps } from './ManualEntryPanel';
import { ManualEntryPanel } from './ManualEntryPanel';

let wrapper;
const currentLocale = 'en-US';
const defaultTransferCountryOptions = [
  { countryId: 'CAN', countryName: 'Canada' },
  { countryId: 'FRA', countryName: 'France' },
  { countryId: 'GER', countryName: 'Germany' },
  { countryId: 'MEX', countryName: 'Mexico' },
  { countryId: 'MTQ', countryName: 'Martinique' },
  { countryId: 'USA', countryName: 'US' },
  { countryId: 'USX', countryName: 'US Extended' },
];

function setup({
  goBack = () => {},
  transferRecipientCountryId = 'USA',
  changeRecipientNumber = () => {},
  changeRecipientCountryId = () => {},
  transferRecipientNumber = '6508653454',
  allowManualInternationalTransfer = false,
}: Partial<ManualEntryPanelProps>) {
  return mount(
    <RcThemeProvider>
      <ManualEntryPanel
        currentLocale={currentLocale}
        goBack={goBack}
        transferRecipientCountryId={transferRecipientCountryId}
        changeRecipientNumber={changeRecipientNumber}
        changeRecipientCountryId={changeRecipientCountryId}
        transferCountryOptions={defaultTransferCountryOptions}
        transferRecipientNumber={transferRecipientNumber}
        allowManualInternationalTransfer={allowManualInternationalTransfer}
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

describe('<ManualEntryPanel />', () => {
  it('Display Back Button and when user click it, function goBack will be called', () => {
    const goBack = jest.fn(() => {});
    wrapper = setup({ goBack });
    wrapper
      .find('[data-sign="backButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(goBack).toHaveBeenCalled();
  });

  it('Display Next Button and when user click it, function changeRecipientNumber will be called', () => {
    const changeRecipientNumber = jest.fn(() => {});
    wrapper = setup({ changeRecipientNumber });
    const userInput = '343535435';
    const eventObj = { target: { value: userInput } };
    wrapper
      .find('RcDialTextField')
      .at(0)
      .find('input')
      .simulate('change', eventObj);
    wrapper
      .find('[data-sign="nextButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(changeRecipientNumber).toHaveBeenCalledWith(userInput);
  });
});
