import React from 'react';
import { shallow, mount } from 'enzyme';
import UserGuide from 'ringcentral-widgets/components/UserGuide';
import Button from 'ringcentral-widgets/components/Button';

describe('<UserGuide />', () => {
  it('should render corretcly', () => {
    const wrapper = shallow(
      <UserGuide
        curIdx={0}
        guides={['./fake/0.png', './fake/1.png']}
        showSpinner={false}
        currentLocale="en-US"
        entered
        playing
      />
    );
    expect(wrapper.find('.root').length).toEqual(1);
  });

  it('can be skipped on intro page', () => {
    const wrapper = shallow(
      <UserGuide
        curIdx={0}
        guides={['./fake/0.png', './fake/1.png']}
        showSpinner={false}
        currentLocale="en-US"
        entered
        playing
      />
    );
    wrapper.find('.secondaryButton').simulate('click');
    expect(wrapper.state('playing')).toEqual(false);
  });

  it('can be skipped on guides page', () => {
    const wrapper = mount(
      <UserGuide
        curIdx={0}
        guides={['./fake/0.png', './fake/1.png']}
        showSpinner={false}
        currentLocale="en-US"
        entered
        playing
      />
    );
    wrapper.find('.control .secondaryButton').first().simulate('click');
    expect(wrapper.state('playing')).toEqual(false);
  });
});
