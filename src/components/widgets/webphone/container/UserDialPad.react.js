import DialPad from '../presentation/DialPad/DialPad.react';
import { connect as phoneConnect } from '../../../../utils/integration/';

const withPhone = phoneConnect(phone => ({
  call: (...args) => {
    phone.webphone.call(...args);
  },
}))(DialPad);

export default withPhone;
