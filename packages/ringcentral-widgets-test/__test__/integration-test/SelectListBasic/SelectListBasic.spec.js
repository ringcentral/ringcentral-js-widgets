import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import React from 'react';
import { SelectListBasic } from '@ringcentral-integration/widgets/components/SelectListBasic';

function renderFunction(option) {
  return option.value;
}

function searchOption(option, text) {
  return (
    option.value && option.value.toLowerCase().includes(text.toLowerCase())
  );
}

const currentLocale = 'en-US';
const title = 'headerTitle';
const placeholder = 'placeholderText';
const matchedTitle = 'matched';
const otherTitle = 'others';

const mockRenderListView = (options, type) =>
  options.length
    ? options.map(({ id, value }) => {
        return (
          <div key={id} className={type}>
            {value}
          </div>
        );
      })
    : null;

const options = [
  {
    id: '11',
    value: 'value11',
  },
  {
    id: '12',
    value: 'value12',
  },
  {
    id: '13',
    value: 'value13',
  },
];

const otherOptions = [
  {
    id: '21',
    value: 'value21',
  },
  {
    id: '22',
    value: 'value22',
  },
];

function setup() {
  const wrapper = mount(
    <RcThemeProvider>
      <SelectListBasic
        title={title}
        placeholder={placeholder}
        options={options}
        otherOptions={otherOptions}
        searchOption={searchOption}
        renderFunction={renderFunction}
        currentLocale={currentLocale}
        matchedTitle={matchedTitle}
        otherTitle={otherTitle}
        renderListView={mockRenderListView}
        open
      />
    </RcThemeProvider>,
  );
  return wrapper;
}

beforeEach(async () => {});

describe('<SelectListBasic />', () => {
  it('search result title', () => {
    const wrapper = setup();
    const searchResult = wrapper.find('[data-sign="searchResult"]').at(0);
    expect(searchResult.find('.title').at(0).text()).toBe('matched (3)');
    expect(searchResult.find('.title').at(1).text()).toBe('others (2)');
  });

  it('search bar: input 3, show value13 in matched, show nothing in other', () => {
    const wrapper = setup(options, otherOptions);
    const searchInput = wrapper
      .find('[data-sign="searchBar"]')
      .find('input')
      .at(0);

    searchInput.simulate('change', { target: { value: '3' } });
    expect(wrapper.find('.matched').length).toBe(1);
    expect(wrapper.find('.matched').at(0).text()).toBe('value13');
    expect(wrapper.find('.other').length).toBe(0);
  });

  it('search bar: input 2, show value12 in matched, show value21, value22 in other', () => {
    const wrapper = setup(options, otherOptions);
    const searchInput = wrapper
      .find('[data-sign="searchBar"]')
      .find('input')
      .at(0);

    searchInput.simulate('change', { target: { value: '2' } });
    expect(wrapper.find('.matched').length).toBe(1);
    expect(wrapper.find('.matched').at(0).text()).toBe('value12');
    expect(wrapper.find('.other').length).toBe(2);
    expect(wrapper.find('.other').at(0).text()).toBe('value21');
    expect(wrapper.find('.other').at(1).text()).toBe('value22');
  });

  it('search bar: input 5, show "No result found for 5"', () => {
    const wrapper = setup(options, otherOptions);
    const searchInput = wrapper
      .find('[data-sign="searchBar"]')
      .find('input')
      .at(0);

    searchInput.simulate('change', { target: { value: '5' } });
    expect(wrapper.find('.matched').length).toBe(0);
    expect(wrapper.find('.other').length).toBe(0);
    const searchResult = wrapper.find('[data-sign="searchResult"]').at(0);
    expect(searchResult.text()).toBe('No result found for "5"');
  });
});
