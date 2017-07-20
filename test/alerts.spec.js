import toJson from 'enzyme-to-json';

import wrapper from './shared';

describe('test alerts', () => {
  test('initial state', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
