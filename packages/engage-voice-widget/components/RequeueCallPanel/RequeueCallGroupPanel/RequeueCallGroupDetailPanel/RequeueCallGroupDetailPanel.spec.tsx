import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import { RequeueCallGroupDetailPanel } from './RequeueCallGroupDetailPanel';

let wrapper;
const currentLocale = 'en-US';
const searchGate = ({ gateName }, text) => {
  return (
    gateName && text && gateName.toLowerCase().includes(text.toLowerCase())
  );
};
const defalutSelectedQueueGroup = {
  groupName: 'group3432',
  gates: [
    { gateId: '40520', gateName: 'DukeTest1' },
    { gateId: '40521', gateName: 'DukeTest2' },
    { gateId: '40522', gateName: 'EVdemo' },
  ],
};

function setup({
  goBack = () => {},
  selectedQueueGroup = defalutSelectedQueueGroup,
  selectedGateIndex = 0,
  submitSelection = () => {},
} = {}) {
  const selectedGateId = defalutSelectedQueueGroup.gates[selectedGateIndex]
    ? defalutSelectedQueueGroup.gates[selectedGateIndex].gateId
    : '';
  return mount(
    <RcThemeProvider>
      <RequeueCallGroupDetailPanel
        currentLocale={currentLocale}
        goBack={goBack}
        searchGate={searchGate}
        selectedQueueGroup={selectedQueueGroup as any}
        selectedGateId={selectedGateId}
        submitSelection={submitSelection}
      />
    </RcThemeProvider>,
  );
}

const getSearchInput = () =>
  wrapper
    .find('RcOutlineTextField')
    .at(0)
    .find('input');

const getDetailItems = () =>
  wrapper
    .find('RcList')
    .at(0)
    .find('RcListItem');

const getSubmitButton = () =>
  wrapper
    .find('RcButton[data-sign="select-group-item"]')
    .at(0)
    .find('button');

describe('<RequeueCallGroupPanel />', async () => {
  it('Can display selected Queue Group Name and all the Queues', () => {
    wrapper = setup({});
    expect(
      wrapper
        .find('BackHeader')
        .at(0)
        .prop('title'),
    ).toBe(defalutSelectedQueueGroup.groupName);
    expect(getDetailItems().length).toBe(3);
  });

  it('Default with select Queue and enabled Select Button', () => {
    const selectedGateIndex = 1;
    wrapper = setup({
      selectedGateIndex,
    });
    expect(
      getDetailItems()
        .at(selectedGateIndex)
        .prop('selected'),
    ).toBe(true);
    expect(getSubmitButton().prop('disabled')).toBe(false);
  });

  it('When user click Back Button and function goBack will be called', () => {
    const goBack = jest.fn(() => {});
    wrapper = setup({ goBack });
    wrapper
      .find('[data-sign="backButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(goBack).toBeCalled();
  });

  it('When user select a queue, the queue will be highlighted, then user click the select button, submitSelection will be called', () => {
    const selectedGateIndex = 1;
    const submitSelection = jest.fn(() => {});
    wrapper = setup({ submitSelection });

    getDetailItems()
      .at(selectedGateIndex)
      .find('RcListItem')
      .find('div')
      .simulate('click');

    expect(
      getDetailItems()
        .at(selectedGateIndex)
        .find('RcListItem')
        .prop('selected'),
    ).toBe(true);

    const submitButton = getSubmitButton();
    expect(submitButton.prop('disabled')).toBe(false);
    submitButton.simulate('click');

    const selectedGateId =
      defalutSelectedQueueGroup.gates[selectedGateIndex].gateId;
    expect(submitSelection).toBeCalledWith(selectedGateId);
  });

  it("When user select no queue, the Select Button should be disabled and submitSelection shouldn't be called", () => {
    const selectedGateIndex = -1;
    const submitSelection = jest.fn(() => {});
    wrapper = setup({ submitSelection, selectedGateIndex });

    expect(
      wrapper
        .find('RcList')
        .at(0)
        .find('ListItemWithScrollCheck[selected=true]').length,
    ).toBe(0);

    const submitButton = getSubmitButton();
    expect(submitButton.prop('disabled')).toBe(true);

    submitButton.simulate('click');
    expect(submitSelection).not.toBeCalled();
  });

  it('Can search Requeue Queue', () => {
    wrapper = setup();
    const eventObj = { target: { value: 'Duke' } };
    getSearchInput().simulate('change', eventObj);

    expect(getDetailItems().length).toBe(2);
  });

  it('Can search Requeue Queue, but with no result', () => {
    wrapper = setup();
    const searchText = 'Amy';
    const eventObj = { target: { value: searchText } };
    getSearchInput().simulate('change', eventObj);

    expect(getDetailItems().length).toBe(0);

    expect(
      wrapper
        .find('[data-sign="searchResult"]')
        .at(0)
        .find('div')
        .at(0)
        .text(),
    ).toBe(`No result found for "${searchText}"`);
  });
});
