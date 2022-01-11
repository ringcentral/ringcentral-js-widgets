import { Login } from '../../../../steps/Login';
import { CheckCallingSettings } from './RCI-803';

CheckCallingSettings({
  Login,
  expectedJupiterName: 'RingCentral App',
  expectedPhoneName: 'RingCentral Phone',
});
