import { shallow } from 'enzyme';
import React, {Component} from 'react';
import LogIcon from 'ringcentral-widgets/components/LogIcon';

const setup = (props) => {
  const wrapper = shallow(<LogIcon
    currentLocale='en-US'
    {...props}
  />);
  return wrapper;
};

describe('Log Icon:', () => {
  it('Should display logged button with tooltip:Logged when has props: id', () => {
    const props = {
      sessionId: '123',
      id: '1',
      viewTask: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('div').props().children.props.className).toEqual('loggedIcon');
    expect(wrapper.find('div').props().title).toEqual('Logged');
  });
  it('Should display unlogged button with tooltip:Logged when do not have props: id', () => {
    const props = {
      sessionId: '123',
      viewTask: () => {},
    };
    const wrapper = setup(props);
    expect(wrapper.find('div').props().children.props.className).toEqual('unloggedIcon');
    expect(wrapper.find('div').props().title).toEqual('Unworked');
  });
  it('Should display Disabled unloggedIcon Icon with tooltip: To log fax is not supported.', () => {
    const props = {
      sessionId: '123',
      viewTask: () => {},
      isFax: true,
      disabled: true,
    };
    const wrapper = setup(props);
    expect(wrapper.find('div').props().children.props.className).toEqual('unloggedIcon');
    expect(wrapper.props().className).toMatch(/disabled/);
    expect(wrapper.find('div').props().title).toEqual('To log fax is not supported.');
  });
});

