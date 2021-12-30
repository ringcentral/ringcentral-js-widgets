import React from 'react';

import { mount } from 'enzyme';

import { RcThemeProvider } from '@ringcentral/juno';

import { PickList, PickListProps } from './PickList';

let wrapper;
const defaultOptions = [
  {
    id: '101',
    label: 'work',
    name: 'work name',
    wholeName: 'work name whole',
  },
  {
    id: '102',
    label: 'study',
    name: 'studyname',
    wholeName: 'studyname  whole',
  },
  {
    id: '103',
    label: 'have fun',
    name: 'funname',
    wholeName: 'funname name whole',
  },
];

const customOptions = defaultOptions.map((item) => ({
  key: item.id,
  name: item.name,
  wholeName: item.wholeName,
}));

function setup({
  options = defaultOptions,
  optionValueKey = 'id',
  optionLabelKey = 'label',
  label = 'pickListTest',
  value,
  required = false,
  onChange = () => null,
  dataSign = 'pickList',
  renderItem,
  renderValue,
}: Partial<PickListProps>) {
  return mount(
    <RcThemeProvider>
      <PickList
        options={options}
        optionValueKey={optionValueKey}
        optionLabelKey={optionLabelKey}
        label={label}
        value={value}
        required={required}
        onChange={onChange}
        dataSign={dataSign}
        renderItem={renderItem}
        renderValue={renderValue}
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

describe('<PickList />', () => {
  it('PickList can render correctly with selection, and can be selected to change', () => {
    const onChange = jest.fn();
    const label = 'pickListTest2';
    const value = '102';
    wrapper = setup({
      label,
      value,
      onChange,
    });
    expect(wrapper.find('label').text()).toBe(label);
    expect(wrapper.find('label').text()).not.toContain('*');
    expect(wrapper.find('label').hasClass('Mui-required')).toBe(false);
    expect(wrapper.find('input').prop('value')).toBe(value);
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(
      defaultOptions.find((option) => option.id === value).label,
    );
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].label);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
    // const selectIndex = 2;
    // menuItems[selectIndex].click();
    // expect(onChange).toBeCalledWith(defaultOptions[selectIndex].id);
  });

  it('PickList can render correctly without selection, and can be selected to change.', () => {
    const onChange = jest.fn();
    const label = 'pickListTest2';
    wrapper = setup({
      label,
      onChange,
      required: true,
    });
    expect(wrapper.find('label').text()).toContain(label);
    expect(wrapper.find('label').text()).toContain('*');
    expect(wrapper.find('label').hasClass('Mui-required')).toBe(true);
    expect(wrapper.find('input').prop('value')).toBe('');
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe('​');
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // const selectIndex = 2;
    // menuItems[selectIndex].click();
    // expect(onChange).toBeCalledWith(defaultOptions[selectIndex].id);
  });

  it('PickList can display by using renderValue', () => {
    const onChange = jest.fn();
    const renderValue = jest.fn(
      (key) => defaultOptions.find((item) => item.id === key).name,
    );
    const value = '102';
    wrapper = setup({
      onChange,
      renderValue,
      value,
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    expect(renderValue).toBeCalledWith(value);
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(renderValue(value));
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].label);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
  });

  it('PickList can display by using renderItem', () => {
    const onChange = jest.fn();
    const renderItem = jest.fn((item) => item.wholeName);
    const value = '102';
    wrapper = setup({
      onChange,
      renderItem,
      value,
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(
      defaultOptions.find((option) => option.id === value).wholeName,
    );
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toBeCalledTimes(defaultOptions.length);
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].wholeName);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
  });

  it('PickList can using custom value, label to render.', () => {
    const onChange = jest.fn();
    const value = '102';
    const optionValueKey = 'key';
    const optionLabelKey = 'name';
    wrapper = setup({
      options: customOptions,
      optionValueKey,
      optionLabelKey,
      onChange,
      value,
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(
      customOptions.find((option) => option[optionValueKey] === value)[
        optionLabelKey
      ],
    );
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(customOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(customOptions[index][optionLabelKey]);
    //   expect(el.dataset.value).toBe(customOptions[index][optionValueKey]);
    // });
  });

  it('When PickList use custom value, label, can also use renderValue, renderItem to render correctly', () => {
    const onChange = jest.fn();
    const renderValue = jest.fn(
      (n) => customOptions.find((item) => item.key === n).name,
    );
    const renderItem = jest.fn((item) => item.wholeName);
    const value = '102';
    const optionValueKey = 'key';
    const optionLabelKey = 'name';
    wrapper = setup({
      options: customOptions,
      optionValueKey,
      optionLabelKey,
      onChange,
      renderValue,
      renderItem,
      value,
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    const baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(renderValue(value));
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toBeCalledTimes(customOptions.length);
    // expect(menuItems).toHaveLength(customOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(customOptions[index].wholeName);
    //   expect(el.dataset.value).toBe(customOptions[index][optionValueKey]);
    // });
  });
});
