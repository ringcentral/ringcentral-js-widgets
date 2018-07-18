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
      value: {id:1},
      options: [{id:1}, {id:2}],
      renderFunction: ()=>{},
      valueFunction: ()=>{},
      renderValue: ()=>{},
      onChange: ()=>{},
    };
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});

