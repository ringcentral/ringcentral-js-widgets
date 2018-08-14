import { shallow } from 'enzyme';
import React from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import LogNotification from 'ringcentral-widgets/components/LogNotification';
import Button from 'ringcentral-widgets/components/Button';

const setup = (props) => {
  const currentLog = {
    call: {
      direction: callDirections.inbound,
      to: {
        phoneNumber: '+16509807435'
      },
      from: {
        phoneNumber: '+16509807433'
      },
      duration: 11,
      result: 'Call connected',
      telephonyStatus: null,
    }
  };
  const wrapper = shallow(<LogNotification
    currentLog={currentLog}
    currentLocale='en-US'
    {...props}
  />);
  return wrapper;
};

describe('Call Log Notification:', () => {
  it('log button should be disabled when props: isExpand is true', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onStay: () => {},
      onDiscard: () => {},
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.expandButton').hasClass('expandDisableButton')).toEqual(true);
  });
  it('log button should be enabled when props: isExpand is false', () => {
    const props = {
      formatPhone: value => value,
      isExpand: false,
      onStay: () => {},
      onDiscard: () => {},
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.expandButton').hasClass('expandDisableButton')).toEqual(false);
  });
  it('Should display confirmation info when props: isExpand is true', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onStay: () => {},
      onDiscard: () => {},
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationInfo').exists()).toEqual(true);
    expect(wrapper.find('.confirmationInfo').text()).toEqual('Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?');
  });
  it('Should display confirmation info when props: isExpand is false', () => {
    const props = {
      formatPhone: value => value,
      isExpand: false,
      onStay: () => {},
      onDiscard: () => {},
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationInfo').exists()).toEqual(false);
  });
  it('save & work on new should be selected by default when props: isExpand is true', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onStay: () => {},
      onDiscard: () => {},
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationContainer').find(Button).at(0).props().children).toEqual('Save & Work on New');
    expect(wrapper.find('.confirmationContainer').find(Button).at(0).hasClass('selected')).toEqual(true);
  });
  it('Should display Stay on Previous Work when has props: onStay', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onStay: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationContainer').find(Button).at(0).props().children).toEqual('Stay on Previous Work');
  });
  it('Should display Discard & Work on New when has props: onDiscard', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onDiscard: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationContainer').find(Button).at(0).props().children).toEqual('Discard & Work on New');
  });
  it('Should display Save & Work on New on New when has props: onSave', () => {
    const props = {
      formatPhone: value => value,
      isExpand: true,
      onSave: () => {},
      onExpand: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('.confirmationContainer').find(Button).at(0).props().children).toEqual('Save & Work on New');
  });

});

