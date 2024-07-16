import { RcDialTextField } from '@ringcentral/juno';
import type { ReactWrapper } from 'enzyme';

import type { DialoutStatusesType } from '../../../enums/dialoutStatus';

import { createDialerPanel } from './createDialerPanel';

const mockAudio = () => {
  window.HTMLMediaElement.prototype.play = () => {
    return new Promise((resolve) => {
      resolve();
    });
  };
};

mockAudio();

describe('<DialerPanel />', () => {
  let wrapper: ReactWrapper;
  const getCallButton = () => wrapper.find('[data-sign="callButton"]').at(0);
  const getDeleteButton = () =>
    wrapper.find('button[data-sign="deleteButton"]').last();

  afterEach(async () => {
    wrapper.unmount();
  });

  it('User can manually input numbers in the recipientsInput', async () => {
    const toNumber = '';
    const setToNumber = jest.fn(() => {});
    wrapper = createDialerPanel({ toNumber, setToNumber });
    const recipientsInput = wrapper.find(RcDialTextField).at(0);
    const eventObj = { target: { value: '1243' } };
    recipientsInput.find('input').at(0).simulate('change', eventObj);
    expect(setToNumber).toHaveBeenCalledWith('1243');
  });

  it('Delete button show switch', async () => {
    wrapper = createDialerPanel({ toNumber: '' });
    let deleteButton = getDeleteButton();
    expect(deleteButton.exists()).toBeFalsy();
    wrapper = createDialerPanel({ toNumber: '6508652493' });
    deleteButton = getDeleteButton();
    expect(deleteButton.exists()).toBeTruthy();
  });

  it(`Dialpad is not allowed to dialout in the state of dialing`, async () => {
    const toNumber = '6508652493';
    const dialoutStatus = 'dialing' as DialoutStatusesType;
    const dialout = jest.fn(() => {});
    wrapper = createDialerPanel({ toNumber, dialout, dialoutStatus });
    const callButton = getCallButton();
    callButton.simulate('click');
    expect(dialout).not.toHaveBeenCalled();
  });

  it('User clicks manualDialSettings', () => {
    const goToManualDialSettings = jest.fn(() => {});
    wrapper = createDialerPanel({ goToManualDialSettings });
    const manualDialSettings = wrapper
      .find('[data-sign="manualDialSettings"]')
      .at(0);
    manualDialSettings.simulate('click');
    expect(goToManualDialSettings).toHaveBeenCalled();
  });

  it('Check Disabled Allow Manual Calls', () => {
    /* RCI-3899: Check Disabled Allow Manual Calls
      https://test_it_domain/test-cases/RCI-3899
    */
    wrapper = createDialerPanel({ hasDialer: true });
    const manualDialSettings = wrapper
      .find('[data-sign="manualDialSettings"]')
      .at(0);
    const callButtonTip = wrapper.find('[data-sign="callButtonTip"]').at(0);
    const recipientsInput = wrapper.find(RcDialTextField).at(0);
    expect(recipientsInput.exists()).toBeTruthy();
    expect(manualDialSettings.exists()).toBeTruthy();
    expect(callButtonTip.exists()).toBeTruthy();

    const noDialerWrapper = createDialerPanel({ hasDialer: false });
    const noManualDialSettings = noDialerWrapper
      .find('[data-sign="manualDialSettings"]')
      .at(0);
    const noCallButtonTip = noDialerWrapper
      .find('[data-sign="callButtonTip"]')
      .at(0);
    const noRecipientsInput = noDialerWrapper.find(RcDialTextField).at(0);
    expect(noRecipientsInput.exists()).toBeFalsy();
    expect(noManualDialSettings.exists()).toBeFalsy();
    expect(noCallButtonTip.exists()).toBeFalsy();
  });
});
