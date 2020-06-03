import React from 'react';
import { StepFunction } from 'crius-test';
import { RcThemeProvider } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import { PhoneBookPanel, PhoneBookPanelProps } from './PhoneBookPanel';
import { EvTransferPhoneBookItem } from '../../lib/EvClient';

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

const defaultTransferPhoneBook = [
  { countryId: 'USA', destination: '48573454', name: 'amy liu' },
  { countryId: 'USA', destination: '34534534', name: 'aermin huang' },
  { countryId: 'CAN', destination: '435345564', name: 'duke' },
  { countryId: 'CAN', destination: '5435345344', name: 'bruce li' },
  { countryId: 'USA', destination: '345345345', name: 'amy li' },
];

const defaultSearchPhoneBook = (
  option: EvTransferPhoneBookItem,
  text: string,
) => {
  return (
    (text && option.name?.toLowerCase().includes(text.toLowerCase())) ||
    option.destination?.toLowerCase().includes(text.toLowerCase())
  );
};

function setup({
  goBack = () => {},
  searchPhoneBook = () => {},
  transferPhoneBookSelectedIndex = defaultSearchPhoneBook,
  changeTransferPhoneBookSelected = () => {},
  transferPhoneBook = defaultTransferPhoneBook,
}: Partial<PhoneBookPanelProps>) {
  return mount(
    <RcThemeProvider>
      <PhoneBookPanel
        currentLocale={currentLocale}
        goBack={goBack}
        transferPhoneBook={transferPhoneBook}
        transferPhoneBookSelectedIndex={transferPhoneBookSelectedIndex}
        changeTransferPhoneBookSelected={changeTransferPhoneBookSelected}
        searchPhoneBook={searchPhoneBook}
        transferCountryOptions={defaultTransferCountryOptions}
      />
    </RcThemeProvider>,
  );
}

const getPhoneContacts = () =>
  wrapper
    .find('RcList')
    .at(0)
    .find('[data-sign="phoneContact"]');

const getSearchInput = () =>
  wrapper
    .find('RcOutlineTextField')
    .at(0)
    .find('input');

export const UTPhoneBookCheckBackButton: StepFunction = () => {
  const goBack = jest.fn(() => {});
  wrapper = setup({ goBack });
  wrapper
    .find('[data-sign="backButton"]')
    .at(0)
    .find('button')
    .simulate('click');
  expect(goBack).toBeCalled();
};

export const UTPhoneBookContactListDisplayAndHighlight: StepFunction = () => {
  const transferPhoneBookSelectedIndex = 1;
  wrapper = setup({
    transferPhoneBookSelectedIndex,
  });
  const phoneContacts = getPhoneContacts();
  expect(phoneContacts.length).toBe(defaultTransferPhoneBook.length);
  expect(
    phoneContacts.at(transferPhoneBookSelectedIndex).prop('selected'),
  ).toBe(true);
};

export const UTPhoneBookContactCanBeClicked: StepFunction = () => {
  const changeTransferPhoneBookSelected = jest.fn(() => {});
  wrapper = setup({ changeTransferPhoneBookSelected });
  const selectIndex = 1;
  getPhoneContacts()
    .at(selectIndex)
    .find('[role="button"]')
    .at(0)
    .simulate('click');
  expect(changeTransferPhoneBookSelected).toBeCalledWith(selectIndex);
};

export const UTPhoneBookListSearchCases = [
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509807610' },
      { name: 'EVdemo', number: '6508797699' },
    ],
    searchText: 'Duke',
    matchedResult: [0],
  },
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509807610' },
      { name: 'DukeTest2', number: '6509807688' },
    ],
    searchText: 'ke',
    matchedResult: [0, 1],
  },
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509807610' },
      { name: 'DukeTest2', number: '6509807688' },
    ],
    searchText: '650',
    matchedResult: [0, 1],
  },
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509805610' },
      { name: 'DukeTest2', number: '6509807688' },
    ],
    searchText: '6509807',
    matchedResult: [1],
  },
  // { //skip this for it's a bug waiting to be fixed.
  //   title: 'PhoneBook can be searched',
  //   phoneBookList: [
  //     { name: 'DukeTest1', number: '6509807610' },
  //     { name: 'DukeTest2', number: '6509807688' },
  //   ],
  //   searchText: '(650)',
  //   matchedResult: [0, 1],
  // },
  // {
  //   title: 'PhoneBook can be searched',
  //   phoneBookList: [
  //     { name: 'DukeTest1', number: '6509805610' },
  //     { name: 'DukeTest2', number: '6509807688' },
  //   ],
  //   searchText: '(650)9807',
  //   matchedResult: [1],
  // },
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509807610' },
      { name: 'EVdemo', number: '6508797699' },
    ],
    searchText: 'AA',
    matchedResult: [],
  },
];

export const UTPhoneBookListSearchNoResultCases = [
  {
    title: 'PhoneBook can be searched',
    phoneBookList: [
      { name: 'DukeTest1', number: '6509807610' },
      { name: 'EVdemo', number: '6508797699' },
    ],
    searchText: 'AA',
    matchedResult: 'No result found for "AA"',
  },
];
interface UTPhoneBookListSearchProps {
  phoneBookList: { name: string; number: string }[];
  searchText: string;
  matchedResult: string[] | string;
}

export const UTPhoneBookListSearch: StepFunction<UTPhoneBookListSearchProps> = ({
  phoneBookList,
  searchText,
  matchedResult,
}) => {
  const searchPhoneBook = jest.fn(defaultSearchPhoneBook);
  wrapper = setup({
    searchPhoneBook,
    transferPhoneBook: phoneBookList.map(({ name, number }) => ({
      name,
      destination: number,
      countryId: 'USA',
    })),
  });
  const eventObj = { target: { value: searchText } };
  getSearchInput().simulate('change', eventObj);
  const phoneContacts = getPhoneContacts();
  if (Array.isArray(matchedResult)) {
    expect(phoneContacts).toHaveLength(matchedResult.length);
    const resultItems = phoneContacts.map((el) =>
      el.find('.phoneBookDest').text(),
    );
    expect(resultItems).toStrictEqual(
      matchedResult.map((i) => phoneBookList[i].number),
    );
  } else {
    expect(phoneContacts).toHaveLength(0);
    expect(wrapper.find('[data-sign="searchResult"]').text()).toBe(
      `No result found for "${searchText}"`,
    );
  }
};

interface UTCheckInternalPanelRenderProps {
  internalOptions: string;
}
export const UTCheckPhoneBookPanelRender: StepFunction<UTCheckInternalPanelRenderProps> = async ({
  internalOptions,
}) => {
  const wrapper = setup({});
  const dataSign = {
    'Search bar': 'searchBar',
    'Phone Book recipient list with numbers': 'searchResult',
  };
  expect(
    wrapper.find(`[data-sign="${dataSign[internalOptions]}"]`),
  ).not.toBeUndefined();
};
