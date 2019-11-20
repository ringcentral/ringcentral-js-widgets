import { mount, shallow } from 'enzyme';
import React from 'react';
import DropdownSelect from 'ringcentral-widgets/components/DropdownSelect';

const Opportunity = [
  {
    Name: 'test1',
    Phone: '6501234567',
    Id: '0031N00001QSvbuQLead',
  },
  {
    Name: 'test2',
    Phone: '6501234567',
    Id: '0031N00001QSvbuQADOpportunity',
  },
];

function typingText(wrapper, textContent) {
  const event = new Event('input');
  Object.defineProperty(event, 'target', {
    get() {
      return { textContent };
    },
  });
  wrapper
    .find('span')
    .at(0)
    .instance()
    .dispatchEvent(event);
}

beforeEach(async () => {});

describe('<DropdownSelect />', () => {
  const searchHandler = jest.fn();
  const onChangeHandler = jest.fn();

  const wrapper = mount(
    <DropdownSelect
      options={Opportunity}
      searchOption={searchHandler}
      onChange={onChangeHandler}
      value={Opportunity[0]}
      dropdownAlign="left"
      titleEnabled
      renderValue={(value) => {
        if (value) {
          return value.Name;
        }
        return '[None]';
      }}
      renderFunction={(item) => {
        if (item !== null) {
          return item.Name;
        }
        return '[None]';
      }}
    />,
  );

  it('click dropdownList and the menu should be opend', () => {
    const button = wrapper.find('[type="button"]').at(0);
    button.simulate('click');

    expect(wrapper.state('open')).toEqual(true);
  });

  it('check the contenteditable has be add', () => {
    expect(
      wrapper
        .find('[data-sign="selectedItem"]')
        .render()
        .attr().contenteditable,
    ).toBe('true');
  });

  it('typing text, the filter should change.', () => {
    const nextInput = 't1';
    typingText(wrapper, nextInput);
    expect(wrapper.state('filter')).toEqual(nextInput);
  });

  it('filter options should be called', () => {
    expect(searchHandler).toHaveBeenCalled();
  });

  it('set filter method and typing text in field, the options should be filter with condition.', () => {
    wrapper.setProps({
      searchOption: (option, text) => option.Name.includes(text),
    });

    const nextInput = 't1';
    typingText(wrapper, nextInput);

    const dropdownList = wrapper.find('.dropdownItem');
    const dropdownListTexts = dropdownList.map((item) => item.text());

    expect(dropdownListTexts).toEqual(['test1']);
  });

  it('when click the filter option, the value should be change', () => {
    const dropdownList = wrapper.find('.dropdownItem');

    const selected = dropdownList.at(0);
    selected.simulate('click');

    expect(onChangeHandler).toHaveBeenCalled();
    expect(wrapper.find('[data-sign="selectedItem"]').text()).toEqual(
      selected.text(),
    );
    expect(wrapper.state('open')).toEqual(false);
  });
});
