import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import WebPhone from '../src/components/webphone/presentation/webphone.react'
import DialPad from '../src/components/webphone/presentation/dialpad.react'
import ActiveCall from '../src/components/webphone/presentation/activecall.react'

describe('<WebPhone />', () => {

  it('render <DialPad /> component', () => {
    const wrapper = shallow(<WebPhone />);
    expect(wrapper.contains(<DialPad />)).to.equal(true);
  });

  it('render <ActiveCall /> component', () => {
    const wrapper = shallow(<WebPhone status='OnCall' phoneNumber='123'/>);
    expect(wrapper.contains(<ActiveCall phoneNumber='123'/>)).to.equal(true);
  });

});

describe('<DialPad />', () => {

  it('simulates click events', () => {
    const wrapper = shallow(<DialPad />);
    wrapper.find('button.button-1').simulate('click');
    expect(wrapper.state().dialingNumber).to.equal('1');
  });

});
