import toJson from 'enzyme-to-json';

import { getWrapper } from './shared';

let wrapper = null;
beforeEach(() => {
  wrapper = getWrapper();
});

describe('test alerts', () => {
  test('initial state', () => {
    expect(wrapper).toBeDefined();
    const json = toJson(wrapper);
    expect(json).toBeDefined();
    expect(json.children[0].type).toEqual('Provider');
  });
});
