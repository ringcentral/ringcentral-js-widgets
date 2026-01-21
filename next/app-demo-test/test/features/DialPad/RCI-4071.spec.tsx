import { Entry } from '../../steps/Entry';
import { Login } from '../../steps/Login';

import { CheckHitEnterInputMoreThanThreeSpaces } from './index';

CheckHitEnterInputMoreThanThreeSpaces({ Login: [Entry, Login] });
