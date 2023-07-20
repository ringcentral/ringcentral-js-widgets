import React from 'react';

import { mount } from 'enzyme';

import { RcThemeProvider } from '@ringcentral/juno';

import i18n from '../../modules/EvManualDialSettingsUI/i18n';
import type { ManualDialSettingsPanelProps } from './ManualDialSettingsPanel';
import { ManualDialSettingsPanel } from './ManualDialSettingsPanel';

let wrapper;
const currentLocale = 'en-US';
const pickListItems = [
  {
    key: '101',
    label: 'work',
    name: 'work name',
    wholeName: 'work name whole',
  },
  {
    key: '102',
    label: 'study',
    name: 'studyname',
    wholeName: 'studyname  whole',
  },
];

const defaultSettingFields = [
  {
    dataSign: 'callerId',
    onChange: () => null,
    value: undefined,
    select: {
      label: 'Call ID',
      required: true,
      options: pickListItems,
    },
  },
  {
    dataSign: 'ringTime',
    onChange: () => null,
    value: undefined,
    input: {
      required: true,
      label: 'Ring time (seconds)',
      type: 'text',
      placeholder: 'input holder',
    },
  },
];

function setup({
  goBack = () => {},
  settingFields = defaultSettingFields,
}: Partial<ManualDialSettingsPanelProps>) {
  return mount(
    <RcThemeProvider>
      <ManualDialSettingsPanel
        currentLocale={currentLocale}
        goBack={goBack}
        settingFields={settingFields}
        init={() => {}}
        save={() => {}}
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

describe('<ManualDialSettingsPanel />', () => {
  it('Display Back Button and when user click it, function goBack will be called', () => {
    const goBack = jest.fn();
    wrapper = setup({ goBack });
    expect(wrapper.find('.title').text()).toBe(
      i18n.getString('manualDialSettings', currentLocale),
    );

    wrapper
      .find('[data-sign="backButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(goBack).toBeCalled();
  });

  // Declan: I thinks that is not need, that is too detail about render, just using snapshot is ok

  // it('Can render select, input list respectively', () => {
  //   wrapper = setup({});
  //   defaultSettingFields.forEach((field) => {
  //     if (field.select) {
  //       const pickList = wrapper.find(
  //         `PickList[data-sign="${field.dataSign}"]`,
  //       );
  //       expect(pickList).toHaveLength(1);
  //       expect(pickList.find('label').text()).toContain(field.select.label);
  //       expect(pickList.find('label').text()).toContain('*');
  //       expect(pickList.find('input').prop('value')).toBe('');
  //     }
  //     if (field.input) {
  //       const rcTextField = wrapper.find(
  //         `RcTextField[data-sign="${field.dataSign}"]`,
  //       );
  //       expect(rcTextField).toHaveLength(1);
  //       expect(rcTextField.find('label').text()).toContain(field.input.label);
  //       expect(rcTextField.find('label').text()).toContain('*');
  //       expect(rcTextField.find('input').prop('value')).toBe('');
  //     }
  //   });
  // });

  // it('Check PickList from settingFields can render correctly', () => {
  //   const customSelect = {
  //     dataSign: 'callerId',
  //     value: '101',
  //     onChange: jest.fn(),
  //     select: {
  //       options: pickListItems,
  //       label: 'Color Dropdown',
  //       required: false,
  //       optionValueKey: 'key',
  //       optionKey: 'name',
  //       renderValue: jest.fn(
  //         (n) => pickListItems.find((item) => item.key === n).name,
  //       ),
  //       renderItem: jest.fn((item) => item.wholeName),
  //     },
  //   };

  //   wrapper = setup({
  //     settingFields: [customSelect],
  //   });
  //   const pickList = wrapper.find(
  //     `PickList[data-sign="${customSelect.dataSign}"]`,
  //   );
  //   expect(pickList.find('label').text()).toContain(customSelect.select.label);
  //   expect(pickList.find('label').text()).not.toContain('*');
  //   expect(pickList.find('input').prop('value')).toBe(customSelect.value);
  //   const baseButton = wrapper.find('[role="button"]');
  //   expect(baseButton.text()).toBe(
  //     customSelect.select.renderValue(customSelect.value),
  //   );
  //   baseButton.simulate('click');
  //   const menuItems = document.body.querySelectorAll<HTMLInputElement>(
  //     '[role="presentation"] li[role="option"]',
  //   );
  //   expect(customSelect.select.renderItem).toBeCalledTimes(
  //     pickListItems.length,
  //   );
  //   expect(menuItems).toHaveLength(pickListItems.length);
  //   menuItems.forEach((el, index) => {
  //     expect(el.textContent).toBe(
  //       customSelect.select.renderItem(pickListItems[index]),
  //     );
  //     expect(el.dataset.value).toBe(
  //       pickListItems[index][customSelect.select.optionValueKey],
  //     );
  //   });
  //   const selectIndex = 1;
  //   menuItems[selectIndex].click();
  //   expect(customSelect.onChange).toBeCalledWith(
  //     pickListItems[selectIndex][customSelect.select.optionValueKey],
  //   );
  // });

  it('Check input can render correctly', () => {
    const customInput = {
      dataSign: 'ringTime',
      value: '30',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      input: {
        type: 'number',
        label: 'Ring time (seconds)',
        required: false,
        placeholder: 'Ring time (seconds)',
        min: 20,
        max: 120,
      },
    };

    wrapper = setup({
      settingFields: [customInput],
    });
    const rcTextField = wrapper.find(
      `RcTextField[data-sign="${customInput.dataSign}"]`,
    );
    const input = rcTextField.find('input');
    expect(rcTextField.find('label').text()).toContain(customInput.input.label);
    expect(rcTextField.find('label').text()).not.toContain('*');
    expect(input.prop('required')).toBe(customInput.input.required);
    expect(input.prop('value')).toBe(customInput.value);
    expect(input.prop('placeholder')).toBe(customInput.input.placeholder);
    expect(input.prop('type')).toBe(customInput.input.type);
    expect(input.prop('min')).toBe(customInput.input.min);
    expect(input.prop('max')).toBe(customInput.input.max);

    input.simulate('blur');
    expect(customInput.onBlur).toBeCalled();

    const changeValue = 35;
    input.simulate('change', { target: { value: changeValue } });
    expect(customInput.onChange).toBeCalledWith(changeValue);
  });
});
