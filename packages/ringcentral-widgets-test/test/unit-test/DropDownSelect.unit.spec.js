import React, {Component} from 'react';
import renderer from 'react-test-renderer'
import DropdownSelect from 'ringcentral-widgets/components/DropdownSelect';

const setup = (props) => {
  const wrapper = renderer.create(<DropdownSelect
    currentLocale='en-US'
    {...props}
  />);
  return wrapper;
};

describe('DropdownSelect:', () => {
  it('render correctly', () => {
    const props = {
      value: 0,
      options: [],
      renderFunction: ()=>{},
      valueFunction: ()=>{},
    };
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});

