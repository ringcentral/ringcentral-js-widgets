import React from 'react';

import { mount } from 'enzyme';

import DropdownSelect from '@ringcentral-integration/widgets/components/DropdownSelect';

const Options = ['123', '456', '789'];
const OptionsWithLabel = [
  { label: 'aaa', value: '123' },
  { label: 'bbb', value: '456' },
  { label: 'ccc', value: '789' },
];

function typingText(wrapper, textContent) {
  wrapper.find('input').simulate('change', { target: { value: textContent } });
}

beforeEach(async () => {});

describe('<DropdownSelect /> basic use', () => {
  const onChangeHandler = (val) => wrapper.setProps({ value: val });
  const wrapper = mount(
    <DropdownSelect
      options={Options}
      onChange={onChangeHandler}
      value={Options[0]}
      dropdownAlign="left"
      titleEnabled
    />,
  );

  it('render a span element to display selected value', () => {
    expect(wrapper.find('span[data-sign="selectedItem"]').exists());
  });

  it('click dropdownList and the menu should be opened', () => {
    const button = wrapper.find('[data-sign="selectRoot"]').at(0);
    button.simulate('click');
    expect(wrapper.state('open')).toEqual(true);
  });

  it('when click the option, the value should be change', () => {
    const dropdownList = wrapper.find('li[data-sign="selectMenuItem"]');
    const selected = dropdownList.at(1);
    selected.simulate('click');
    expect(wrapper.find('[data-sign="selectedItem"]').text()).toEqual(
      selected.text(),
    );
    expect(wrapper.state('open')).toEqual(false);
  });
});

describe('<DropdownSelect /> with searchOption', () => {
  const searchHandler = (option, text) => option.includes(text);
  const onChangeHandler = (val) => wrapper.setProps({ value: val });
  const wrapper = mount(
    <DropdownSelect
      options={Options}
      searchOption={searchHandler}
      onChange={onChangeHandler}
      value={Options[0]}
      dropdownAlign="left"
      titleEnabled
    />,
  );

  it('render an input element to display selected value', () => {
    expect(wrapper.find('input[data-sign="selectedItem"]').exists());
  });

  it('open the dropdown, saveContent should equal to the current selected value.', () => {
    const button = wrapper.find('[data-sign="selectRoot"]').at(0);
    button.simulate('click');
    expect(wrapper.instance()['saveContent']).toEqual('123');
  });

  it('typing text, the filter should change.', () => {
    const nextInput = '1';
    typingText(wrapper, nextInput);
    expect(wrapper.state('filter')).toEqual(nextInput);
  });

  it('typing text in field, the options should be filter with condition.', () => {
    const nextInput = '4';
    typingText(wrapper, nextInput);
    const dropdownList = wrapper.find('li[data-sign="selectMenuItem"]');
    const dropdownListTexts = dropdownList.map((item) => item.text());
    expect(dropdownListTexts).toEqual(['456']);
  });
});

describe('<DropdownSelect /> with customInputEnabled', () => {
  const onChangeHandler = (val) => wrapper.setProps({ value: val });
  const wrapper = mount(
    <DropdownSelect
      options={Options}
      onChange={onChangeHandler}
      value={Options[0]}
      dropdownAlign="left"
      titleEnabled
      customInputEnabled
    />,
  );

  it('render an input element to display selected value', () => {
    expect(wrapper.find('input[data-sign="selectedItem"]').exists());
  });

  it('typing text in field, the value props should be updated and equal to input value.', () => {
    const nextInput = '333';
    typingText(wrapper, nextInput);
    expect(wrapper.props().value).toEqual('333');
  });

  it('the filter state should not change since the searchOption was not be set.', () => {
    expect(wrapper.state('filter')).toBeNull();
  });
});

describe('<DropdownSelect /> with optionsWithLabel', () => {
  const onChangeHandler = (val) => wrapper.setProps({ value: val });
  const wrapper = mount(
    <DropdownSelect
      options={OptionsWithLabel}
      onChange={onChangeHandler}
      value={OptionsWithLabel[0].value}
      dropdownAlign="left"
      titleEnabled
      optionsWithLabel
      customInputEnabled
    />,
  );

  it('render an input element to display selected value, and it will contain the "inputWithLabel" class', () => {
    expect(
      wrapper.find('input.inputWithLabel[data-sign="selectedItem"]').exists(),
    );
  });

  it('render a selected option label', () => {
    expect(wrapper.find('span.selectedOptionLabel').exists());
  });

  it('click dropdownList and the input element should have an "active" class, and the label should have a "selectedOptionLabelHide" class', () => {
    const button = wrapper.find('[data-sign="selectRoot"]').at(0);
    button.simulate('click');
    expect(wrapper.find('input.inputWithLabel.active').exists());
    expect(wrapper.find('span.selectedOptionLabelHide').exists());
  });

  it('the options should be rendered with a pair of label and value', () => {
    expect(wrapper.find('span[data-sign="optionLabel"]')).toHaveLength(3);
    expect(wrapper.find('span[data-sign="optionValue"]')).toHaveLength(3);
  });

  it('when click the option, the value should be change', () => {
    const dropdownList = wrapper.find('li[data-sign="selectMenuItem"]');
    const selected = dropdownList.at(1);
    selected.simulate('click');
    expect(wrapper.find('[data-sign="selectedItem"]').props().value).toEqual(
      OptionsWithLabel[1].value,
    );
    expect(wrapper.state('open')).toEqual(false);
  });
});
