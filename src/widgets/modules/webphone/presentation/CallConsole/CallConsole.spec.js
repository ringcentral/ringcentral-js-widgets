/* global describe it */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { postProcess } from '../../../../../utils/test';

import data from '../../../../../../test.json';

import CallConsole from './CallConsole.react';
import iconsStyles from '../../../../../styles/icon.css';
import { button, disabled, word, icon, panel, line } from './CallConsole.css';

import classNames from 'classnames';

function iconClass(iconId) {
  return classNames(
          iconsStyles[iconId],
          iconsStyles.icon,
          icon
        );
}

describe('<CallConsole />', () => {
  it('can disable all panel', () => {
    const wrapper = shallow(
      <CallConsole
        {...postProcess(data['ActiveCall.react.js'])}
        disabled
      />
    );
    const holdingButton = wrapper.find(`.${line}`).at(0).childAt(0);
    const keypadButton = wrapper.find(`.${line}`).at(0).childAt(1);
    const recordButton = wrapper.find(`.${line}`).at(0).childAt(2);
    const flipButton = wrapper.find(`.${line}`).at(1).childAt(0);
    const transferButton = wrapper.find(`.${line}`).at(1).childAt(1);
    const parkButton = wrapper.find(`.${line}`).at(1).childAt(2);
    expect(holdingButton.hasClass(disabled)).to.equal(true);
    expect(keypadButton.hasClass(disabled)).to.equal(true);
    expect(recordButton.hasClass(disabled)).to.equal(true);
    expect(flipButton.hasClass(disabled)).to.equal(true);
    expect(transferButton.hasClass(disabled)).to.equal(true);
    expect(parkButton.hasClass(disabled)).to.equal(true);
  });

  it('has two-line layout', () => {
    const wrapper = shallow(
      <CallConsole
        {...postProcess(data['ActiveCall.react.js'])}
      />
    );
    expect(wrapper.find(`.${line}`)).to.have.length(2);
  });

  it('handle button clicks', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <CallConsole
        {...postProcess(data['ActiveCall.react.js'])}
        handleHoldClick={onButtonClick}
      />
    );
    const holdingButton = wrapper.find(`.${line}`).at(0).childAt(0);
    holdingButton.simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });

  it('show disable status', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <CallConsole
        {...postProcess(data['ActiveCall.react.js'])}
        handleHoldClick={onButtonClick}
      />
    );
    const holdingSpan = wrapper.find(`.${line}`).at(0).childAt(0).find('span');
    if (postProcess(data['CallConsole.react.js']).status.indexOf('HOLDING') === -1) {
      expect(holdingSpan.hasClass(iconClass('icon-uni28'))).to.equal(true);
    } else {
      expect(holdingSpan.hasClass(iconClass('icon-uni35'))).to.equal(true);
    }
  });
});
