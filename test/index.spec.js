import toJson from 'enzyme-to-json';

import wrapper from './shared';

describe('test alerts', () => {
  test('initial state', () => {
    expect(wrapper).toBeDefined();
    const json = toJson(wrapper);
    expect(json).toBeDefined();
    expect(json.children[0].type).toEqual('Provider');
    console.info(toJson(wrapper));
  });
});
