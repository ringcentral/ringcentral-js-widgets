import React from 'react';
import { mount } from 'enzyme';

import App from './App';
import phone from './MockPhone';

export const wrapper = mount(<App phone={phone} />);
