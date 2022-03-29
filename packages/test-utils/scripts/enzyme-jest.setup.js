import { configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const adapter = new Adapter();
configure({ adapter });
