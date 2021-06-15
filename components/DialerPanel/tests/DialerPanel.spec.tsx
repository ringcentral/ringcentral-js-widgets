import {
  render,
  fireEvent,
} from '@ringcentral-integration/test-utils/lib/test-utils';
import { ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { RecipientsInput } from 'ringcentral-widgets/components/Rcui/RecipientsInput';

import { DialoutStatusesType } from '../../../enums/dialoutStatus';
import { DialerPanel } from '../DialerPanel';
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

  [
    { toNumber: '', desc: 'with no number filled' },
    { toNumber: '6508652493', desc: 'without number filled' },
  ].forEach(({ toNumber, desc }) => {
    it(`Default state of dialpad(${desc}): Call Button be highlighted and can be clicked to dialout`, () => {
      const dialout = jest.fn(() => {});
      wrapper = createDialerPanel({ toNumber, dialout });
      const recipientsInput = wrapper.find(RecipientsInput).at(0);
      const callButton = getCallButton();
      expect(recipientsInput.prop('value')).toBe(toNumber);
      expect(callButton.prop('color')).toBe('success.b03');
      expect(callButton.prop('data-icon')).toBe('answer');
      callButton.simulate('click');
      expect(dialout).toBeCalled();
    });
  });

  it('User can manually input numbers in the recipientsInput', async () => {
    const toNumber = '';
    const setToNumber = jest.fn(() => {});
    wrapper = createDialerPanel({ toNumber, setToNumber });
    const recipientsInput = wrapper.find(RecipientsInput).at(0);
    const eventObj = { target: { value: '1243' } };
    recipientsInput.find('input').at(0).simulate('change', eventObj);
    expect(setToNumber).toBeCalledWith('1243');
  });

  it('dialButtonDisabled can set dial button disable attribute', () => {
    const getDialButtonDisabled = () =>
      getCallButton().render().attr('disabled');

    wrapper = createDialerPanel({ dialButtonDisabled: true });
    expect(getDialButtonDisabled()).toBe('disabled');

    wrapper = createDialerPanel({ dialButtonDisabled: false });
    expect(getDialButtonDisabled()).toBe(undefined);
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
    expect(callButton.prop('data-icon')).toBe('hand-up');
    callButton.simulate('click');
    expect(dialout).not.toBeCalled();
  });

  it(`User can hangup a call in the state of callConnected`, async () => {
    const toNumber = '6508652493';
    const dialoutStatus = 'callConnected' as DialoutStatusesType;
    const dialout = jest.fn(() => {});
    const hangup = jest.fn(() => {});
    wrapper = createDialerPanel({ toNumber, dialout, hangup, dialoutStatus });
    const callButton = getCallButton();
    expect(callButton.prop('data-icon')).toBe('hand-up');
    callButton.simulate('click');
    expect(dialout).not.toBeCalled();
    expect(hangup).toBeCalled();
  });

  it('User clicks manualDialSettings', () => {
    const goToManualDialSettings = jest.fn(() => {});
    wrapper = createDialerPanel({ goToManualDialSettings });
    const manualDialSettings = wrapper
      .find('[data-sign="manualDialSettings"]')
      .at(0);
    manualDialSettings.simulate('click');
    expect(goToManualDialSettings).toBeCalled();
  });

  it("User can use digit virtual keyboard to input numbers, and press zero for 1 second will typing '+'", async () => {
    jest.useFakeTimers();
    const toNumber = '1234';
    const setToNumber = jest.fn(() => {});
    wrapper = createDialerPanel({ toNumber, setToNumber });
    const dialPad = wrapper.find('DialPad').at(0);
    const digitButtons = dialPad.find('button');

    const typingIcons = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '*',
      '0',
      '#',
    ];

    digitButtons.forEach((button, i) => {
      button.simulate('mousedown');
      button.simulate('mouseup');
      expect(setToNumber).toBeCalledWith(`${toNumber}${typingIcons[i]}`);
    });

    const buttonZero = digitButtons.at(10);

    buttonZero.simulate('mousedown');
    await act(async () => {
      jest.advanceTimersByTime(1100);
    });
    buttonZero.simulate('mouseup');

    expect(setToNumber).toBeCalledWith('1234+');
  });
});

describe('<DialerPanel />', () => {
  it('Click Delete Button', async () => {
    const toNumber = '6508652493';
    const setToNumber = jest.fn(() => {});

    const { container } = render(
      <DialerPanel
        currentLocale="en-US"
        dialout={() => {}}
        toNumber={toNumber}
        size="small"
        dialButtonDisabled={false}
        hasDialer
        setToNumber={setToNumber}
        goToManualDialSettings={() => {}}
        dialoutStatus="idle"
        hangup={() => {}}
      />,
    );
    const deleteButton = container.querySelector('button');

    fireEvent.mouseDown(deleteButton);
    fireEvent.mouseUp(deleteButton);

    expect(setToNumber).toBeCalledWith(toNumber.slice(0, -1));
  });

  it('Long press Delete Button', async () => {
    jest.useFakeTimers();
    const toNumber = '6508652493';
    const setToNumber = jest.fn(() => {});

    const { container } = render(
      <DialerPanel
        currentLocale="en-US"
        dialout={() => {}}
        toNumber={toNumber}
        size="small"
        dialButtonDisabled={false}
        hasDialer
        setToNumber={setToNumber}
        goToManualDialSettings={() => {}}
        dialoutStatus="idle"
        hangup={() => {}}
      />,
    );
    const deleteButton = container.querySelector('button');

    fireEvent.mouseDown(deleteButton);

    await act(async () => {
      jest.advanceTimersByTime(1100);
      // here will hidden deleteButton when clear toNumber, so we don't need mouseUp
      // deleteButton.simulate('mouseUp');
    });
    expect(setToNumber).toBeCalledWith('');
  });
});
