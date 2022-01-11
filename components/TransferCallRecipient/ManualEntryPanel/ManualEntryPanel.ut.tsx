import React from 'react';

import { mount } from 'enzyme';

import { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';

import { ManualEntryPanel, ManualEntryPanelProps } from './ManualEntryPanel';

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

interface UTCheckManualEntryRenderProps {
  internalOptions: string;
}

export const UTCheckManualEntryRender: StepFunction<UTCheckManualEntryRenderProps> =
  async ({ internalOptions }) => {
    const wrapper = setup({});
    const dataSign = {
      'Enter number field': 'transferRecipientNumber',
      Dialpad: 'dialPad',
    };
    expect(
      wrapper.find(`[data-sign="${dataSign[internalOptions]}"]`),
    ).not.toBeUndefined();
  };

export const UTManualEntryInternationalTransferForbid: StepFunction<any> =
  async () => {
    const transferRecipientCountryId = 'FRA';
    const allowManualInternationalTransfer = false;
    wrapper = setup({
      allowManualInternationalTransfer,
      transferRecipientCountryId,
    });
    expect(wrapper.find('PickList[data-sign="transferCountry"]')).toHaveLength(
      0,
    );
  };

export const UTManualEntryInternationalTransferAllowed: StepFunction<any> =
  async () => {
    const changeRecipientCountryId = jest.fn(() => {});
    const allowManualInternationalTransfer = true;
    const countryId = 'GER';
    wrapper = setup({
      allowManualInternationalTransfer,
      changeRecipientCountryId,
    });

    const transferCountry = wrapper
      .find('PickList[data-sign="transferCountry"]')
      .at(0);
    transferCountry.find('[role="button"]').simulate('click');
    document.body
      .querySelector<HTMLLIElement>(`li[data-value="${countryId}"]`)
      .click();
    expect(changeRecipientCountryId).toBeCalledWith(countryId);
  };

export const UTManualEntryInternationalTransferRender: StepFunction<any> =
  async () => {
    const transferRecipientCountryId = 'FRA';
    const transferRecipientNumber = '6508653454';
    const allowManualInternationalTransfer = true;
    wrapper = setup({
      allowManualInternationalTransfer,
      transferRecipientCountryId,
      transferRecipientNumber,
    });
    const transferCountry = wrapper.find(
      'PickList[data-sign="transferCountry"]',
    );
    expect(transferCountry.prop('value')).toBe(transferRecipientCountryId);

    expect(transferCountry.find('[role="button"]').text()).toBe(
      defaultTransferCountryOptions.filter(
        (x) => x.countryId === transferRecipientCountryId,
      )[0].countryName,
    );

    expect(
      wrapper
        .find('RecipientsInput[data-sign="transferRecipientNumber"]')
        .prop('value'),
    ).toBe(transferRecipientNumber);
  };
