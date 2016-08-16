/* global describe it */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import data from '../../../../../../test.json';

import AuthPanel from './AuthPanel.react';

function postProcess(key) {
  if (key === 'FUNCTION') {
    return function anomy() {};
  }
  return key;
}

describe('<AuthPanel />', () => {
  // it('render <DialPad /> component', () => {
  //   const wrapper = shallow(<WebPhone />);
  //   expect(wrapper.contains(<DialPad />)).to.equal(true);
  // });

  it('render <AuthPanel /> component', () => {
    console.dir(data['AuthPanel.react.js']);
    const wrapper = shallow(<AuthPanel {...data['AuthPanel.react.js']} />);
    expect(wrapper.contains(<AuthPanel phoneNumber={'123'} />)).to.equal(true);
  });
});

// describe('<DialPad />', () => {
//   it('simulates click events', () => {
//     const wrapper = shallow(<DialPad />);
//     wrapper.find('button.button-1').simulate('click');
//     expect(wrapper.state().dialingNumber).to.equal('1');
//   });
// });
