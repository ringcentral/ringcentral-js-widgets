/* global describe it */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import { postProcess } from '../../../utils/test';

import data from '../../../../test.json';

import AuthPanel from './index';

describe('<AuthPanel />', () => {
  it('render a Login button', () => {
    const wrapper = shallow(<AuthPanel {...postProcess(data['AuthPanel.react.js'])} />);
    expect(wrapper.find('button').text()).to.equal('Login');
  });

  // it('turn isOauthOpened state to true when oauth', () => {
  //   const wrapper = shallow(<AuthPanel {...postProcess(data['AuthPanel.react.js'])} />);
  //   wrapper.find('button').simulate('click');
  //   expect(wrapper.state('isOauthOpened')).to.equal(true);
  // });
});

