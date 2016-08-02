/* global describe it */

import React from 'react';
import { createStore } from 'redux';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Provider, PhoneProvider, connect } from './';

describe('connect', () => {
  class Passthrough extends React.Component {
    render() {
      return <div></div>;
    }
  }
  it('should have context in wrapped component', () => {
    const store = createStore((state, action) => state);
    const Container = (props) => (<Passthrough {...props} />);
    const phone = {
      attr: 1,
    };
    const Wrapper = connect((state, props, p) => ({ attr: p.attr }))(Container);
    const tree = mount(
      <Provider store={store}>
        <PhoneProvider phone={phone}>
          <Wrapper />
        </PhoneProvider>
      </Provider>
    );
    expect(Wrapper.displayName).to.equal('Connect(Container)');
    expect(Wrapper.contextTypes.phone).to.equal(React.PropTypes.object);
    expect(tree.find('Connect(Container)')).to.have.length(1);
    expect(tree.find('Passthrough').props().attr).to.equal(1);
    // expect(tree.find(<Container />).props()).to.equal(phone);
  });
});
