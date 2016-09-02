/* global describe it */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { postProcess } from '../../../../../utils/test';

import data from '../../../../../../test.json';

import ActiveCall from './';
import CallFooter from '../CallFooter/CallFooter.react';
import CallConsole from '../CallConsole/CallConsole.react';

describe('<ActiveCall />', () => {
  it('count the duration', (done) => {
    const wrapper = mount(<ActiveCall {...postProcess(data['ActiveCall.react.js'])} />);
    expect(wrapper.state('duration')).to.equal(0);
    setTimeout(() => {
      expect(wrapper.state('duration')).to.equal(1);
      done();
    }, 1000);
  });

  it('can bye when click right button of call footer', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <ActiveCall
        {...postProcess(data['ActiveCall.react.js'])}
        bye={onButtonClick}
      />
    );
    wrapper.find(CallFooter).prop('onRightClick')();
    expect(onButtonClick.calledOnce).to.equal(true);
  });

  it('can transfer', () => {
    const wrapper = shallow(<ActiveCall {...postProcess(data['ActiveCall.react.js'])} />);
    wrapper.find(CallConsole).prop('handleTransferClick')();
    expect(wrapper.state('openedPanel')).to.equal('transfer');
  });

  it('can record', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <ActiveCall
        {...postProcess(data['ActiveCall.react.js'])}
        record={onButtonClick}
      />
    );
    wrapper.find(CallConsole).prop('handleRecordClick')();
    expect(onButtonClick.calledOnce).to.equal(true);
  });

  it('can hold', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <ActiveCall
        {...postProcess(data['ActiveCall.react.js'])}
        hold={onButtonClick}
      />
    );
    wrapper.find(CallConsole).prop('handleHoldClick')();
    expect(onButtonClick.calledOnce).to.equal(true);
  });

  it('can mute', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <ActiveCall
        {...postProcess(data['ActiveCall.react.js'])}
        mute={onButtonClick}
      />
    );
    wrapper.find(CallFooter).prop('onLeftClick')();
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});
