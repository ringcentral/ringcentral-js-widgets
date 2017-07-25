import { Provider } from 'react-redux';
import { Router } from 'react-router';
import toJson from 'enzyme-to-json';

import { getWrapper, getState, timeout } from './shared';
import ComposeTextPanel from '../src/components/ComposeTextPanel';

let panel = null;
let wrapper = null;
beforeEach(async () => {
  wrapper = getWrapper();
  panel = wrapper.find(Provider).first()
    .find(Router).first()
    .find(ComposeTextPanel)
    .first();
});

describe('compose text panel', () => {
  test('initial state', () => {
  });
});
