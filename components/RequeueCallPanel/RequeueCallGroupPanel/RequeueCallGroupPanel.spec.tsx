import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import { RequeueCallGroupPanel } from './RequeueCallGroupPanel';

let wrapper;
const currentLocale = 'en-US';
const searchGroup = ({ groupName }, text) => {
  return (
    groupName && text && groupName.toLowerCase().includes(text.toLowerCase())
  );
};
const defaultQueueGroups = [
  { gateGroupId: '50520', groupName: 'DukeTest1' },
  { gateGroupId: '50521', groupName: 'DukeTest2' },
  { gateGroupId: '50522', groupName: 'EVdemo' },
];

function setup({
  queueGroups = defaultQueueGroups,
  selectedQueueGroupIndex = 0,
  goToRequeueGroupDetailPage = () => {},
  goToRequeueCallPage = () => {},
} = {}) {
  const selectedQueueGroupId = queueGroups[selectedQueueGroupIndex]
    ? queueGroups[selectedQueueGroupIndex].gateGroupId
    : '';
  return mount(
    <RcThemeProvider>
      <RequeueCallGroupPanel
        currentLocale={currentLocale}
        goToRequeueCallPage={goToRequeueCallPage}
        searchGroup={searchGroup}
        queueGroups={queueGroups as any}
        selectedQueueGroupId={selectedQueueGroupId}
        goToRequeueGroupDetailPage={goToRequeueGroupDetailPage}
      />
    </RcThemeProvider>,
  );
}

const getGroupItems = () =>
  wrapper
    .find('[data-sign="searchResult"]')
    .at(0)
    .find('RcList')
    .at(0)
    .find('RcListItem');

const getSearchInput = () => wrapper.find('RcTextField').at(0).find('input');

describe('<RequeueCallGroupPanel />', async () => {
  it('Has no available Requeue Group', () => {
    wrapper = setup({ queueGroups: [] });
    expect(
      wrapper.find('[data-sign="searchResult"]').at(0).find('RcList').length,
    ).toBe(0);
  });

  it('Can display all the Requeue Groups correctly', () => {
    wrapper = setup({});
    expect(getGroupItems().length).toBe(3);
  });

  it('Requeue Groups has default select Queue Group Id', () => {
    const selectedQueueGroupIndex = 1;
    wrapper = setup({ selectedQueueGroupIndex });

    expect(
      getGroupItems()
        .at(selectedQueueGroupIndex)
        .find('div')
        .hasClass('Mui-selected'),
    ).toBe(true);
  });

  it('When click the Back Button of the header, can redirct to RequeueCallPage', () => {
    const goToRequeueCallPage = jest.fn(() => {});
    wrapper = setup({ goToRequeueCallPage });
    wrapper
      .find('[data-sign="backButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(goToRequeueCallPage).toBeCalled();
  });

  it('When click Requeue Group, can redirct to RequeueGroupDetailPage', () => {
    const goToRequeueGroupDetailPage = jest.fn(() => {});
    wrapper = setup({ goToRequeueGroupDetailPage });
    const selectIndex = 1;
    getGroupItems().at(selectIndex).find('[role="button"]').simulate('click');

    expect(goToRequeueGroupDetailPage).toBeCalledWith({
      groupId: defaultQueueGroups[selectIndex].gateGroupId,
    });
  });

  it('Can search Requeue Group', () => {
    wrapper = setup();
    const eventObj = { target: { value: 'Duke' } };
    getSearchInput().simulate('change', eventObj);

    expect(getGroupItems().length).toBe(2);
  });

  it('Can search Requeue Group, but with no result', () => {
    wrapper = setup();
    const searchText = 'Amy';
    const eventObj = { target: { value: searchText } };
    getSearchInput().simulate('change', eventObj);

    expect(getGroupItems().length).toBe(0);
    expect(
      wrapper.find('[data-sign="searchResult"]').at(0).find('div').at(0).text(),
    ).toBe(`No result found for "${searchText}"`);
  });
});
