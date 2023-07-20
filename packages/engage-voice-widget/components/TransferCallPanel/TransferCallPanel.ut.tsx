import React from 'react';

import { mount } from 'enzyme';

import type { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';

import { transferTypes } from '../../enums/transferTypes';
import type { EvTransferOption } from '../../interfaces';
import i18n from './i18n';
import type { TransferCallPanelProps } from './TransferCallPanel';
import { TransferCallPanel } from './TransferCallPanel';

const currentLocale = 'en-US';
const defaultTransferOptions: EvTransferOption[] = [
  {
    type: transferTypes.phoneBook,
    label: i18n.getString(transferTypes.phoneBook, currentLocale),
    textFields: [
      {
        label: i18n.getString('callRecipientName', currentLocale),
        placeholder: i18n.getString(
          'callRecipientNamePlaceholder',
          currentLocale,
        ),
        value: '',
        disabled: false,
        router: `/activityCallLog/123456789/transferCall/phoneBook`,
      },
      {
        label: i18n.getString('callRecipientNumber', currentLocale),
        placeholder: i18n.getString(
          'callRecipientNumberPlaceholder',
          currentLocale,
        ),
        value: '',
        disabled: true,
      },
    ],
  },
  {
    type: transferTypes.manualEntry,
    label: i18n.getString(transferTypes.manualEntry, currentLocale),
    textFields: [
      {
        label: i18n.getString('phoneNumber', currentLocale),
        placeholder: i18n.getString(
          'enterThePhoneNumberPlaceholder',
          currentLocale,
        ),
        router: `/activityCallLog/123456789/transferCall/manualEntry`,
        value: '',
        disabled: false,
      },
    ],
  },
  {
    type: transferTypes.internal,
    label: i18n.getString(transferTypes.internal, currentLocale),
    textFields: [
      {
        label: i18n.getString('callRecipientName', currentLocale),
        placeholder: i18n.getString(
          'callRecipientNamePlaceholder',
          currentLocale,
        ),
        router: `/activityCallLog/123456789/transferCall/internal`,
        value: '',
        disabled: false,
      },
    ],
  },
];
const defaultTextFields = defaultTransferOptions[0].textFields;

function setup({
  currentLocale = 'en-US',
  goBack = () => {},
  clickCallRecipient = () => {},
  transferring = false,
  clickTransferTypeFiled = () => {},
  setStayOnCall = () => {},
  isStayOnCall = false,
  transferOptions = defaultTransferOptions,
  selectedTransferType = transferTypes.phoneBook,
  textFields = defaultTextFields,
  transferCallDisabled = false,
  transferCall = () => {},
  setCancelTemplate = () => {},
  cancelTransfer = () => {},
  cancelTransferPage = () => {},
}: Partial<TransferCallPanelProps>) {
  return mount(
    <RcThemeProvider>
      <TransferCallPanel
        currentLocale={currentLocale}
        goBack={goBack}
        clickCallRecipient={clickCallRecipient}
        transferring={transferring}
        clickTransferTypeFiled={clickTransferTypeFiled}
        setStayOnCall={setStayOnCall}
        isStayOnCall={isStayOnCall}
        transferOptions={transferOptions}
        selectedTransferType={selectedTransferType}
        textFields={textFields}
        transferCallDisabled={transferCallDisabled}
        transferCall={transferCall}
        setCancelTemplate={setCancelTemplate}
        cancelTransfer={cancelTransfer}
        cancelTransferPage={cancelTransferPage}
      />
    </RcThemeProvider>,
  );
}

const getTransferCallButton = (wrapper) =>
  wrapper.find('RcButton[data-sign="transferCall"]').at(0).find('button');

export const UTCheckTransferCallRenderCases = [
  {
    title:
      'Can display transferType, callRecipient correctly, and can click to change TransferType',
    selectedTransferType: transferTypes.internal,
    transferOptions: defaultTransferOptions,
  },
  {
    title:
      'Can display transferType, callRecipient correctly, and can click to change TransferType',
    selectedTransferType: transferTypes.phoneBook,
    transferOptions: defaultTransferOptions,
  },
  {
    title:
      'Can display transferType, callRecipient correctly, and can click to change TransferType',
    selectedTransferType: transferTypes.manualEntry,
    transferOptions: defaultTransferOptions,
  },
];

export const UTCheckTransferCallRender: StepFunction<any> = ({
  selectedTransferType,
  transferOptions,
}) => {
  const clickTransferTypeFiled = jest.fn(() => {});
  const wrapper = setup({
    transferOptions,
    selectedTransferType,
    clickTransferTypeFiled,
  });
  const { textFields = [] } =
    transferOptions.find((option) => option.type === selectedTransferType) ||
    {};
  textFields.forEach((textField, index) => {
    expect(
      wrapper
        .find(`RcTextField[data-sign="callRecipient${index}"]`)
        .prop('value'),
    ).toBe(textField.value);
  });
  const transferTypePickList = wrapper.find(
    'PickList[data-sign="transferType"]',
  );
  expect(transferTypePickList.prop('value')).toBe(selectedTransferType);
  wrapper.unmount();
};

export const UTCheckBackButton: StepFunction = () => {
  const goBack = jest.fn(() => {});
  const wrapper = setup({ goBack });
  wrapper
    .find('[data-sign="backButton"]')
    .at(0)
    .find('button')
    .simulate('click');
  expect(goBack).toBeCalled();
};

export const UTUserClickCallRecipientCases = [
  {
    title: 'User can click callRecipient field to change callRecipient',
    selectedTransferType: transferTypes.internal,
  },
  {
    title: 'User can click callRecipient field to change callRecipient',
    selectedTransferType: transferTypes.phoneBook,
  },
  {
    title: 'User can click callRecipient field to change callRecipient',
    selectedTransferType: transferTypes.manualEntry,
  },
];

export const UTUserClickCallRecipient: StepFunction<any> = () => {
  const clickCallRecipient = jest.fn();

  const textFields = defaultTextFields;
  const selectIndex = 0;

  const wrapper = setup({ clickCallRecipient, textFields });
  const callRecipient = wrapper.find(
    `RcTextField[data-sign="callRecipient${selectIndex}"]`,
  );

  callRecipient.find('input').at(0).simulate('click');

  expect(clickCallRecipient).toBeCalledWith(
    defaultTextFields[selectIndex].router,
  );
};

export const UTSetStayOnCallCases = [
  {
    title:
      'When StayOnCall, click the StayOnCall, setStayOnCall will be called',
    isStayOnCall: true,
  },
  {
    title:
      'When not StayOnCall, click the StayOnCall, setStayOnCall will be called',
    isStayOnCall: false,
  },
];

export const UTSetStayOnCall: StepFunction<any> = ({ isStayOnCall }) => {
  const setStayOnCall = jest.fn(() => {});
  const wrapper = setup({
    setStayOnCall,
    isStayOnCall,
  });
  const checkbox = wrapper
    .find('span[data-sign="stayOnCall"]')
    .at(0)
    .find('input[type="checkbox"]')
    .at(0);
  expect(checkbox.prop('checked')).toBe(isStayOnCall);
  checkbox.simulate('click');
  expect(setStayOnCall).toBeCalledWith(isStayOnCall);
  wrapper.unmount();
};

export const UTTransferCallButtonDisabled: StepFunction = () => {
  const transferCall = jest.fn(() => {});
  const wrapper = setup({
    transferCallDisabled: true,
    transferCall,
  });
  const transferCallButton = getTransferCallButton(wrapper);
  expect(transferCallButton.prop('disabled')).toBe(true);
  transferCallButton.simulate('click');
  expect(transferCall).not.toBeCalled();
};

export const UTWhenCallTransfering: StepFunction = () => {
  const transferring = true;
  const wrapper = setup({
    transferring,
  });
  expect(getTransferCallButton(wrapper).find('RcCircularProgress').length).toBe(
    1,
  );
};
